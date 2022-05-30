/* eslint-disable no-async-promise-executor */
//
// The async promise syntax, new Promise(async (resolve, reject) => {}), should usually be avoided
// because it's easy to miss catching errors inside the promise executor, but we use it in this file
// because the bulk offchain queries are heavily optimized so communities can load quickly.
//
import { QueryTypes, Op } from 'sequelize';
import { Response, NextFunction, Request } from 'express';
import validateChain from '../util/validateChain';
import { factory, formatFilename } from '../../shared/logging';
import { DB } from '../database';
import { TopicInstance } from '../models/topic';
import { RoleInstance } from '../models/role';
import { ThreadInstance } from '../models/thread';
import { ChatChannelInstance } from '../models/chat_channel';

const log = factory.getLogger(formatFilename(__filename));
export const Errors = {};

// Topics, comments, reactions, members+admins, threads
const bulkOffchain = async (
  models: DB,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [community, error] = await validateChain(models, req.query);
  if (error) return next(new Error(error));

  // globally shared SQL replacements
  const communityOptions = 'community_id = :community_id'; // @JAKE @TODO IS this right?
  const replacements = { community_id: community.id };

  // parallelized queries
  const [topics, pinnedThreads, admins, mostActiveUsers, threadsInVoting, chatChannels] =
    await (<
      Promise<
        [
          TopicInstance[],
          unknown,
          RoleInstance[],
          unknown,
          ThreadInstance[],
          ChatChannelInstance[]
        ]
      >
    >Promise.all([
      // topics
      models.Topic.findAll({
        where: { community_id: community.id },
      }),
      // threads, comments, reactions
      new Promise(async (resolve, reject) => {
        try {
          const threadParams = Object.assign(replacements, { pinned: true });
          const rawPinnedThreads = await models.Thread.findAll({
            where: threadParams,
            include: [
              {
                model: models.Address,
                as: 'Address',
              },
              {
                model: models.Address,
                as: 'collaborators',
              },
              {
                model: models.Topic,
                as: 'topic',
              },
              {
                model: models.ChainEntity,
              },
              {
                model: models.LinkedThread,
                as: 'linked_threads',
              },
              {
                model: models.Reaction,
                as: 'reactions',
                include: [
                  {
                    model: models.Address,
                    as: 'Address',
                    required: true,
                  },
                ],
              },
            ],
            attributes: { exclude: ['version_history'] },
          });

          resolve(
            rawPinnedThreads.map((t) => {
              return t.toJSON();
            })
          );
        } catch (e) {
          console.log(e);
          reject(new Error('Could not fetch threads, comments, or reactions'));
        }
      }),
      // admins
      models.Role.findAll({
        where: {
          community_id: community.id,
          permission: { [Op.in]: ['admin', 'moderator'] },
        },
        include: [models.Address],
        order: [['created_at', 'DESC']],
      }),
      // most active users
      new Promise(async (resolve, reject) => {
        try {
          const thirtyDaysAgo = new Date(
            (new Date() as any) - 1000 * 24 * 60 * 60 * 30
          );
          const activeUsers = {};
          const where = {
            updated_at: { [Op.gt]: thirtyDaysAgo },
            community_id: community.id,
          };

          const monthlyComments = await models.Comment.findAll({
            where,
            include: [models.Address],
          });
          const monthlyThreads = await models.Thread.findAll({
            where,
            attributes: { exclude: ['version_history'] },
            include: [{ model: models.Address, as: 'Address' }],
          });

          (monthlyComments as any).concat(monthlyThreads).forEach((post) => {
            if (!post.Address) return;
            const addr = post.Address.address;
            if (activeUsers[addr]) activeUsers[addr]['count'] += 1;
            else
              activeUsers[addr] = {
                info: post.Address,
                count: 1,
              };
          });
          const mostActiveUsers_ = Object.values(activeUsers).sort((a, b) => {
            return (b as any).count - (a as any).count;
          });
          resolve(mostActiveUsers_);
        } catch (e) {
          reject(new Error('Could not fetch most active users'));
        }
      }),
      models.sequelize.query(
        `
     SELECT id, title, stage FROM "Threads"
     WHERE ${communityOptions} AND (stage = 'proposal_in_review' OR stage = 'voting')`,
        {
          replacements,
          type: QueryTypes.SELECT,
        }
      ),
      models.ChatChannel.findAll({
        where: {
          community_id: community.id
        },
        include: {
          model: models.ChatMessage,
          required: false // should return channels with no chat messages
        }
      }),
    ]));

  const numVotingThreads = threadsInVoting.filter(
    (t) => t.stage === 'voting'
  ).length;

  return res.json({
    status: 'Success',
    result: {
      topics: topics.map((t) => t.toJSON()),
      numVotingThreads,
      pinnedThreads, // already converted to JSON earlier
      admins: admins.map((a) => a.toJSON()),
      activeUsers: mostActiveUsers,
      chatChannels: JSON.stringify(chatChannels)
    },
  });
};

export default bulkOffchain;
