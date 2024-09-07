import sinon from 'sinon';
import { contractHelpers } from '../../src/services/commonProtocol';
const getNamespaceBalanceStub = sinon.stub(
  contractHelpers,
  'getNamespaceBalance',
);

import {
  Actor,
  InvalidInput,
  InvalidState,
  command,
  dispose,
} from '@hicommonwealth/core';
import { PermissionEnum } from '@hicommonwealth/schemas';
import { Chance } from 'chance';
import { afterEach } from 'node:test';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  CreateComment,
  CreateCommentErrors,
  CreateCommentReaction,
  MAX_COMMENT_DEPTH,
} from '../../src/comment';
import { models } from '../../src/database';
import { BannedActor, NonMember, RejectedMember } from '../../src/middleware';
import { seed, seedRecord } from '../../src/tester';
import {
  CreateThread,
  CreateThreadReaction,
  CreateThreadReactionErrors,
} from '../../src/thread';
import { getCommentDepth } from '../../src/utils/getCommentDepth';

const chance = Chance();

describe('Thread lifecycle', () => {
  let thread, archived, read_only, comment;
  const roles = ['admin', 'member', 'nonmember', 'banned', 'rejected'] as const;
  const actors = {} as Record<(typeof roles)[number], Actor>;
  const vote_weight = 200;

  const body = chance.paragraph();
  const title = chance.sentence();
  const stage = 'stage';
  const payload = {
    community_id: '',
    topic_id: 0,
    kind: 'discussion' as const,
    title,
    body,
    stage,
    url: 'http://blah',
    canvas_hash: '',
    canvas_signed_data: '',
    read_only: false,
  };

  beforeAll(async () => {
    const threadGroupId = 123456;
    const commentGroupId = 654321;
    const [node] = await seed('ChainNode', { eth_chain_id: 1 });
    const users = await seedRecord('User', roles, (role) => ({
      profile: { name: role },
      isAdmin: role === 'admin',
    }));
    const [community] = await seed('Community', {
      chain_node_id: node!.id!,
      active: true,
      profile_count: 1,
      Addresses: roles.map((role) => ({
        address: `0xaddressof${role}`,
        user_id: users[role].id,
        role: role === 'admin' ? 'admin' : 'member',
        is_banned: role === 'banned',
      })),
      groups: [{ id: threadGroupId }, { id: commentGroupId }],
      topics: [{ group_ids: [threadGroupId, commentGroupId] }],
      CommunityStakes: [
        {
          stake_id: 1,
          stake_token: 'stake',
          stake_enabled: true,
          vote_weight,
        },
      ],
    });
    await seed('GroupPermission', {
      group_id: threadGroupId,
      allowed_actions: [
        PermissionEnum.CREATE_THREAD,
        PermissionEnum.CREATE_THREAD_REACTION,
        PermissionEnum.CREATE_COMMENT_REACTION,
      ],
    });
    await seed('GroupPermission', {
      group_id: commentGroupId,
      allowed_actions: [PermissionEnum.CREATE_COMMENT],
    });

    roles.forEach((role) => {
      const user = users[role];
      const address = community!.Addresses!.find((a) => a.user_id === user.id);
      actors[role] = {
        user: {
          id: user.id,
          email: user.profile.email!,
        },
        address: address!.address,
        addressId: address!.id,
      };
    });

    await models.Membership.bulkCreate([
      {
        group_id: threadGroupId,
        address_id: actors['member'].addressId!,
        last_checked: new Date(),
      },
      {
        group_id: commentGroupId,
        address_id: actors['member'].addressId!,
        last_checked: new Date(),
      },
      {
        group_id: threadGroupId,
        address_id: actors['rejected'].addressId!,
        reject_reason: [
          {
            message: 'User Balance of 0 below threshold 1',
            requirement: {
              data: {
                source: {
                  source_type: 'eth_native',
                  evm_chain_id: 1,
                },
                threshold: '1',
              },
              rule: 'threshold',
            },
          },
        ],
        last_checked: new Date(),
      },
    ]);

    const [archived_thread] = await seed('Thread', {
      community_id: community?.id,
      address_id: community?.Addresses?.at(0)?.id,
      topic_id: community?.topics?.at(0)?.id,
      archived_at: new Date(),
      pinned: false,
      read_only: false,
    });
    archived = archived_thread;

    const [read_only_thread] = await seed('Thread', {
      community_id: community?.id,
      address_id: community?.Addresses?.at(0)?.id,
      topic_id: community?.topics?.at(0)?.id,
      pinned: false,
      read_only: true,
    });
    read_only = read_only_thread;

    payload.community_id = community!.id!;
    payload.topic_id = community!.topics!.at(0)!.id!;
  });

  afterAll(async () => {
    await dispose()();
  });

  const authorizationTests = {
    admin: undefined,
    member: undefined,
    nonmember: NonMember,
    banned: BannedActor,
    rejected: RejectedMember,
  } as Record<(typeof roles)[number], any>;

  roles.forEach((role) => {
    if (!authorizationTests[role]) {
      it(`should create thread as ${role}`, async () => {
        thread = await command(CreateThread(), {
          actor: actors[role],
          payload,
        });
        expect(thread?.title).to.equal(title);
        expect(thread?.body).to.equal(body);
        expect(thread?.stage).to.equal(stage);
      });
    } else {
      it(`should reject create thread as ${role}`, async () => {
        await expect(
          command(CreateThread(), {
            actor: actors[role],
            payload,
          }),
        ).rejects.toThrowError(authorizationTests[role]);
      });
    }
  });

  describe('comments', () => {
    it('should create a thread comment as member of group with permissions', async () => {
      const text = 'hello';
      comment = await command(CreateComment(), {
        actor: actors.member,
        payload: {
          thread_id: thread!.id,
          text,
        },
      });
      expect(comment).to.include({
        thread_id: thread!.id,
        text,
        community_id: thread!.community_id,
      });
    });

    it('should throw error when thread not found', async () => {
      await expect(
        command(CreateComment(), {
          actor: actors.member,
          payload: {
            thread_id: thread!.id + 5,
            text: 'hi',
          },
        }),
      ).rejects.toThrowError(InvalidInput);
    });

    it('should throw error when actor is not member of group with permission', async () => {
      await expect(
        command(CreateComment(), {
          actor: actors.nonmember,
          payload: {
            thread_id: thread!.id,
            text: 'hi',
          },
        }),
      ).rejects.toThrowError(NonMember);
    });

    it('should throw an error when thread is archived', async () => {
      await expect(
        command(CreateComment(), {
          actor: actors.member,
          payload: {
            thread_id: archived!.id,
            text: 'hi',
          },
        }),
      ).rejects.toThrowError(CreateCommentErrors.ThreadArchived);
    });

    it('should throw an error when thread is read only', async () => {
      await expect(
        command(CreateComment(), {
          actor: actors.member,
          payload: {
            thread_id: read_only!.id,
            text: 'hi',
          },
        }),
      ).rejects.toThrowError(CreateCommentErrors.CantCommentOnReadOnly);
    });

    it('should throw error when parent not found', async () => {
      await expect(
        command(CreateComment(), {
          actor: actors.member,
          payload: {
            thread_id: thread!.id,
            parent_id: 1234567890,
            text: 'hi',
          },
        }),
      ).rejects.toThrowError(InvalidState);
    });

    it('should throw error when nesting is too deep', async () => {
      let parent_id = undefined,
        comment;
      for (let i = 0; i <= MAX_COMMENT_DEPTH; i++) {
        comment = await command(CreateComment(), {
          actor: actors.member,
          payload: {
            thread_id: thread!.id,
            parent_id,
            text: `level${i}`,
          },
        });
        parent_id = comment!.id;
        expect(parent_id).toBeDefined();
        const [exceeded, depth] = await getCommentDepth(
          comment as any,
          MAX_COMMENT_DEPTH,
        );
        expect(exceeded).to.be.false;
        expect(depth).toBe(i);
      }
      await expect(
        command(CreateComment(), {
          actor: actors.member,
          payload: {
            thread_id: thread!.id,
            parent_id,
            text: 'hi',
          },
        }),
      ).rejects.toThrowError(CreateCommentErrors.NestingTooDeep);
    });
  });

  describe('thread reaction', () => {
    afterEach(() => {
      getNamespaceBalanceStub.restore();
    });

    it('should create a thread reaction as a member of a group with permissions', async () => {
      getNamespaceBalanceStub.resolves({ [actors.member.address!]: '50' });
      const reaction = await command(CreateThreadReaction(), {
        actor: actors.member,
        payload: {
          thread_id: thread!.id,
          reaction: 'like',
        },
      });
      expect(reaction).to.include({
        thread_id: thread!.id,
        reaction: 'like',
        community_id: thread!.community_id,
      });
    });

    it('should throw error when actor does not have stake', async () => {
      getNamespaceBalanceStub.resolves({ [actors.member.address!]: '0' });
      await expect(
        command(CreateThreadReaction(), {
          actor: actors.member,
          payload: {
            thread_id: thread!.id,
            reaction: 'like',
          },
        }),
      ).rejects.toThrowError(InvalidState);
    });

    it('should throw error when thread not found', async () => {
      await expect(
        command(CreateThreadReaction(), {
          actor: actors.member,
          payload: {
            thread_id: thread!.id + 5,
            reaction: 'like',
          },
        }),
      ).rejects.toThrowError(InvalidInput);
    });

    it('should throw error when actor is not member of group with permission', async () => {
      await expect(
        command(CreateThreadReaction(), {
          actor: actors.nonmember,
          payload: {
            thread_id: thread!.id,
            reaction: 'like',
          },
        }),
      ).rejects.toThrowError(NonMember);
    });

    it('should throw an error when thread is archived', async () => {
      await expect(
        command(CreateThreadReaction(), {
          actor: actors.member,
          payload: {
            thread_id: archived!.id,
            reaction: 'like',
          },
        }),
      ).rejects.toThrowError(CreateThreadReactionErrors.ThreadArchived);
    });

    it('should set thread reaction vote weight and thread vote sum correctly', async () => {
      getNamespaceBalanceStub.resolves({ [actors.admin.address!]: '50' });
      const reaction = await command(CreateThreadReaction(), {
        actor: actors.admin,
        payload: {
          thread_id: read_only!.id,
          reaction: 'like',
        },
      });
      const expectedWeight = 50 * vote_weight;
      expect(reaction?.calculated_voting_weight).to.eq(expectedWeight);
      const t = await models.Thread.findByPk(thread!.id);
      expect(t!.reaction_weights_sum).to.eq(expectedWeight);
    });
  });

  describe('comment reaction', () => {
    afterEach(() => {
      getNamespaceBalanceStub.restore();
    });

    it('should create a comment reaction as a member of a group with permissions', async () => {
      getNamespaceBalanceStub.resolves({ [actors.member.address!]: '50' });
      const reaction = await command(CreateCommentReaction(), {
        actor: actors.member,
        payload: {
          comment_id: comment!.id,
          reaction: 'like',
        },
      });
      expect(reaction).to.include({
        comment_id: comment!.id,
        reaction: 'like',
        community_id: thread!.community_id,
      });
    });

    it('should set comment reaction vote weight and comment vote sum correctly', async () => {
      getNamespaceBalanceStub.resolves({ [actors.admin.address!]: '50' });
      const reaction = await command(CreateCommentReaction(), {
        actor: actors.admin,
        payload: {
          comment_id: comment!.id,
          reaction: 'like',
        },
      });
      const expectedWeight = 50 * vote_weight;
      expect(reaction?.calculated_voting_weight).to.eq(expectedWeight);
      const c = await models.Comment.findByPk(comment!.id);
      expect(c!.reaction_weights_sum).to.eq(expectedWeight * 2); // *2 to account for first member reaction
    });

    it('should throw error when comment not found', async () => {
      await expect(
        command(CreateCommentReaction(), {
          actor: actors.member,
          payload: {
            comment_id: 99999999,
            reaction: 'like',
          },
        }),
      ).rejects.toThrowError(InvalidInput);
    });

    it('should throw error when actor does not have stake', async () => {
      getNamespaceBalanceStub.resolves({ [actors.member.address!]: '0' });
      await expect(
        command(CreateCommentReaction(), {
          actor: actors.member,
          payload: {
            comment_id: comment!.id,
            reaction: 'like',
          },
        }),
      ).rejects.toThrowError(InvalidState);
    });

    it('should throw error when actor is not member of group with permission', async () => {
      await expect(
        command(CreateCommentReaction(), {
          actor: actors.nonmember,
          payload: {
            comment_id: comment!.id,
            reaction: 'like',
          },
        }),
      ).rejects.toThrowError(NonMember);
    });
  });

  // @rbennettcw do we have contest validation tests to include here?
});

/*
  describe('#updateComment', () => {
    test('should update a comment', async () => {
      const data = {
        id: 123,
        thread_id: 2,
        address_id: 1,
        text: 'Wasup',
        community_id: 'ethereum',
        Address: {
          id: 1,
          address: '0x123',
          community_id: 'ethereum',
          save: async () => ({}),
        },
        Thread: {
          id: 2,
          address_id: 1,
          address: '0x123',
          community_id: 'ethereum',
          title: 'Big Thread!',
        },
        save: async () => ({}),
        toJSON: () => data,
      };
      const db = {
        Address: {
          findAll: async () => [{ id: 1 }], // used in findOneRole
        },
        Comment: {
          findOne: async () => data,
          update: () => (data.text = 'Hello'),
        },
        CommentVersionHistory: {
          create: () => null,
          findOne: () => null,
        },
        sequelize: {
          transaction: (callback?: () => Promise<void>) => {
            if (callback) return callback();
            else
              return {
                rollback: () => Promise.resolve({}),
                commit: () => Promise.resolve({}),
              };
          },
          query: () => Promise.resolve([]),
        },
      };

      // @ts-expect-error ignore type
      const serverCommentsController = new ServerCommentsController(db);
      const user = {
        getAddresses: async () => [{ id: 1, verified: true }],
      };
      const address = {
        id: 1,
        address: '0x123',
        chain: 'ethereum',
        save: async () => ({}),
      };
      const commentId = 123;
      const commentBody = 'Hello';
      const [updatedComment] = await serverCommentsController.updateComment({
        // @ts-expect-error ignore type
        user,
        // @ts-expect-error ignore type
        address,
        commentId,
        commentBody,
      });
      expect(updatedComment).to.include({
        id: 123,
        text: 'Hello',
      });
    });

    test('should throw error (thread not found)', () => {
      const data = {
        id: 123,
        thread_id: 2,
        text: 'Wasup',
        community_id: 'ethereum',
        Address: {
          address: '0x123',
          community_id: 'ethereum',
          save: async () => ({}),
        },
        save: async () => ({}),
        toJSON: () => data,
      };
      const db = {
        Comment: {
          findOne: async () => data,
          update: () => null,
        },
        Thread: {
          findOne: async () => null,
        },
        sequelize: {
          transaction: (callback?: () => Promise<void>) => {
            if (callback) return callback();
            else
              return {
                rollback: () => Promise.resolve({}),
                commit: () => Promise.resolve({}),
              };
          },
          query: Promise.resolve([]),
        },
      };

      // @ts-expect-error ignore type
      const serverCommentsController = new ServerCommentsController(db);
      const user = {
        getAddresses: async () => [{ id: 1, verified: true }],
      };
      const address = {
        id: 1,
        address: '0x123',
        chain: 'ethereum',
        save: async () => ({}),
      };
      const commentId = 123;
      const commentBody = 'Hello';
      expect(
        serverCommentsController.updateComment({
          // @ts-expect-error ignore type
          user,
          // @ts-expect-error ignore type
          address,
          commentId,
          commentBody,
        }),
      ).to.be.rejectedWith('Thread not found for comment');
    });
  });
  */
