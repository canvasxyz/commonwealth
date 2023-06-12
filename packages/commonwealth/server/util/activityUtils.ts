import type { DB } from '../models';
import { Op } from 'sequelize';

export async function getActivityFeed(models: DB, id = 0) {
  /**
   * Last 50 updated threads
   */

  const filterByChainForUsers = id
    ? 'JOIN "Addresses" a on a.chain=t.chain and a.user_id = ?'
    : '';

  const query = `
  WITH ranked_thread_notifs as (SELECT t.id AS thread_id,
                                  t.max_not_id
                                FROM "Threads" t 
                                ${filterByChainForUsers}
                                WHERE t.max_not_id IS NOT NULL
                                ORDER BY t.max_not_id DESC
                                LIMIT 50
                                )
  -- this section combines the ranked thread ids from above with comments and reactions in order to
  -- count the number of reactions and comments associated with each thread. It also joins the ranked thread ids
  -- with notifications and threads in order to retrieve notification data and thread view counts respectively
  SELECT nt.thread_id,
         nts.created_at as last_activity,
         nts.notification_data,
         nts.category_id,
         thr.view_count as view_count,
         thr.comment_count AS comment_count,
         thr.reaction_count AS reaction_count
  FROM ranked_thread_notifs nt
  INNER JOIN "Notifications" nts ON nt.max_not_id = nts.id
  JOIN "Threads" thr ON thr.id = nt.thread_id
  ORDER BY nts.created_at DESC;
`;

  const notifications: any = await models.sequelize.query(query, {
    type: 'SELECT',
    raw: true,
    replacements: [id],
  });

  const comments = await models.Comment.findAll({
    where: {
      thread_id: {
        [Op.in]: notifications.map((n) => n.thread_id),
      },
    },
    attributes: ['id', 'thread_id', 'address_id'],
  });

  const addresses = await models.Address.findAll({
    where: {
      id: {
        [Op.in]: comments.map((c) => c.address_id),
      },
    },
  });

  const profiles = await models.Profile.findAll({
    where: {
      id: addresses.map((a) => a.profile_id),
    },
    include: [
      {
        model: models.Address,
      },
    ],
  });

  const notificationsWithProfiles = notifications.map((notification) => {
    const filteredComments = comments.filter(
      (c) => c.thread_id === notification.thread_id
    );
    const notificationProfiles = filteredComments.map((c) => {
      const filteredAddress = addresses.find((a) => a.id === c.address_id);

      return profiles.find((p) => p.id === filteredAddress.profile_id);
    });
    return {
      ...notification,
      commenters: [...new Set(notificationProfiles)],
    };
  });

  return notificationsWithProfiles;
}
