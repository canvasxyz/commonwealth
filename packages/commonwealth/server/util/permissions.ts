import { DB } from '../models';

export enum AccessLevel {
  Admin = 'admin',
  Moderator = 'moderator',
  Member = 'member',
  Everyone = 'everyone',
}

export enum PermissionError {
  NOT_PERMITTED = 'Action not permitted',
}

export enum Action {
  CREATE_CHAT = 0,
  CREATE_REACTION = 1,
  VIEW_REACTIONS = 2,
  DELETE_REACTION = 3,
  CREATE_COMMENT = 4,
  VIEW_COMMENTS = 5,
  EDIT_COMMENT = 6,
  DELETE_COMMENT = 7,
  CREATE_POLL = 8,
  VIEW_POLLS = 9,
  VOTE_ON_POLLS = 10,
  VIEW_CHAT_CHANNELS = 11,
  CREATE_THREAD = 12,
  VIEW_THREADS = 13,
  EDIT_THREAD = 14,
  DELETE_THREAD = 15,
  LINK_THREAD_TO_THREAD = 16,
  LINK_PROPOSAL_TO_THREAD = 17,
  CREATE_TOPIC = 18,
  MANAGE_TOPIC = 19,
  VIEW_TOPICS = 20,
  EDIT_TOPIC = 21,
  DELETE_TOPIC = 22,
  CREATE_ROLE = 23,
  EDIT_ROLE = 24,
  DELETE_ROLE = 25,
  VIEW_ROLES = 26,
  CREATE_PERMISSION = 27,
  EDIT_PERMISSIONS = 28,
}

export type Permissions = { [key: number]: Array<Action> | Action };

export const defaultAdminPermissions: Permissions = {
  [Action.DELETE_THREAD]: [
    Action.EDIT_THREAD,
    Action.CREATE_THREAD,
    Action.VIEW_THREADS,
  ],
  [Action.DELETE_COMMENT]: [
    Action.EDIT_COMMENT,
    Action.CREATE_COMMENT,
    Action.VIEW_COMMENTS,
  ],
  [Action.DELETE_REACTION]: [Action.CREATE_REACTION, Action.VIEW_REACTIONS],
  [Action.DELETE_TOPIC]: [
    Action.EDIT_TOPIC,
    Action.CREATE_TOPIC,
    Action.VIEW_TOPICS,
  ],
};

export const defaultModeratorPermissions: Permissions = {
  [Action.CREATE_CHAT]: Action.VIEW_CHAT_CHANNELS,
  [Action.EDIT_THREAD]: [Action.CREATE_THREAD, Action.VIEW_THREADS],
  [Action.EDIT_COMMENT]: [Action.CREATE_COMMENT, Action.VIEW_COMMENTS],
  [Action.EDIT_TOPIC]: [Action.CREATE_TOPIC, Action.VIEW_TOPICS],
};

export const defaultMemberPermissions: Permissions = {
  [Action.CREATE_POLL]: [Action.VOTE_ON_POLLS, Action.VIEW_POLLS],
  [Action.CREATE_THREAD]: [Action.VIEW_THREADS],
  [Action.CREATE_COMMENT]: [Action.VIEW_COMMENTS],
  [Action.CREATE_REACTION]: [Action.VIEW_REACTIONS],
};

export const defaultEveryonePermissions: Permissions = {
  [Action.DELETE_REACTION]: [Action.CREATE_REACTION, Action.VIEW_REACTIONS],
  [Action.CREATE_THREAD]: Action.VIEW_THREADS,
  [Action.VIEW_CHAT_CHANNELS]: Action.VIEW_CHAT_CHANNELS,
};

export class PermissionManager {
  private models: DB;
  private action: Action;
  private defaultEveryonePermissions: Permissions;
  private defaultAdminPermissions: Permissions;
  private defaultModeratorPermissions: Permissions;
  private defaultMemberPermissions: Permissions;

  constructor(_models: DB) {
    this.models = _models;
    this.defaultEveryonePermissions = defaultEveryonePermissions;
    this.defaultAdminPermissions = defaultAdminPermissions;
    this.defaultModeratorPermissions = defaultModeratorPermissions;
    this.defaultMemberPermissions = defaultMemberPermissions;
  }

  public addAllowImplicitPermission(
    allowPermission: bigint,
    actionNumber: number
  ): bigint {
    const actionAsBigInt: bigint = BigInt(1) << BigInt(actionNumber);
    const newAllowPermission: bigint = allowPermission | actionAsBigInt;
    return newAllowPermission;
  }

  public removeAllowImplicitPermission(
    allowPermission: bigint,
    actionNumber: number
  ): bigint {
    const actionAsBigInt: bigint = BigInt(1) << BigInt(actionNumber);
    const newAllowPermission: bigint = allowPermission & ~actionAsBigInt;
    return newAllowPermission;
  }

  public addDenyImplicitPermission(
    denyPermission: bigint,
    actionNumber: number
  ): bigint {
    const actionAsBigInt: bigint = BigInt(1) << BigInt(actionNumber);
    const newDenyPermission: bigint = denyPermission | actionAsBigInt;
    return newDenyPermission;
  }

  public removeDenyImplicitPermission(
    denyPermission: bigint,
    actionNumber: number
  ): bigint {
    const actionAsBigInt: bigint = BigInt(1) << BigInt(actionNumber);
    const newDenyPermission: bigint = denyPermission & ~actionAsBigInt;
    return newDenyPermission;
  }

  private mapPermissionsToBigint(permissions: Permissions): bigint {
    let permission = 0n;
    for (const key in permissions) {
      const action = permissions[key];
      if (Array.isArray(action)) {
        for (const a of action) {
          permission |= BigInt(1) << a;
        }
      } else {
        permission |= BigInt(1) << action;
      }
    }
    return permission;
  }

  public computePermissions(
    base: Permissions,
    assignments: Array<{ allow: bigint; deny: bigint }>
  ): bigint {
    let permissionsBigInt = this.mapPermissionsToBigint(base);
    for (const assignment of assignments) {
      permissionsBitInt &= ~assignment.deny;
      permissionsBigInt |= assignment.allow;
    }
    return permissionsBigInt;
  }

  public isPermitted(permission: bigint, action: number): boolean {
    const actionAsBigInt: bigint = BigInt(1) << BigInt(action);
    const hasAction: boolean =
      (BigInt(permission) & actionAsBigInt) == actionAsBigInt;
    return hasAction;
  }
}
