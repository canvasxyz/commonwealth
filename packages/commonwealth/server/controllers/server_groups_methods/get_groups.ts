import { Op, WhereOptions } from 'sequelize';
import { GroupAttributes } from 'server/models/group';
import { MembershipAttributes } from 'server/models/membership';
import { TopicAttributes } from 'server/models/topic';
import { CommunityInstance } from '../../models/community';
import { ServerGroupsController } from '../server_groups_controller';

export type GetGroupsOptions = {
  chain: CommunityInstance;
  includeMembers?: boolean;
  includeTopics?: boolean;
  addressId?: number;
};

type GroupWithExtras = GroupAttributes & {
  memberships?: MembershipAttributes[];
  topics?: TopicAttributes[];
};
export type GetGroupsResult = GroupWithExtras[];

export async function __getGroups(
  this: ServerGroupsController,
  { chain, addressId, includeMembers, includeTopics }: GetGroupsOptions,
): Promise<GetGroupsResult> {
  const groups = await this.models.Group.findAll({
    where: {
      chain_id: chain.id,
    },
  });

  let groupsResult = groups.map((group) => group.toJSON() as GroupWithExtras);

  if (includeMembers) {
    // optionally include members with groups
    const where: WhereOptions<MembershipAttributes> = {
      group_id: {
        [Op.in]: groupsResult.map(({ id }) => id),
      },
    };
    if (addressId) {
      // optionally filter by specified address ID
      where.address_id = addressId;
    }
    const members = await this.models.Membership.findAll({
      where,
      include: [
        {
          model: this.models.Address,
          as: 'address',
        },
      ],
    });
    const groupIdMembersMap: Record<number, MembershipAttributes[]> =
      members.reduce((acc, member) => {
        return {
          ...acc,
          [member.group_id]: (acc[member.group_id] || []).concat(member),
        };
      }, {});
    groupsResult = groupsResult.map((group) => ({
      ...group,
      memberships: groupIdMembersMap[group.id] || [],
    }));
  }

  if (includeTopics) {
    const topics = await this.models.Topic.findAll({
      where: {
        chain_id: chain.id,
        group_ids: {
          [Op.overlap]: groupsResult.map(({ id }) => id),
        },
      },
    });
    groupsResult = groupsResult.map((group) => ({
      ...group,
      topics: topics
        .map((t) => t.toJSON())
        .filter((t) => t.group_ids.includes(group.id)),
    }));
  }

  return groupsResult;
}
