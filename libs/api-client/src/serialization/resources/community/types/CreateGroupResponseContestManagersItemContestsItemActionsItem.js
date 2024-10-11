/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from '../../../../core';
import { CreateGroupResponseContestManagersItemContestsItemActionsItemAction } from './CreateGroupResponseContestManagersItemContestsItemActionsItemAction';

export const CreateGroupResponseContestManagersItemContestsItemActionsItem =
  core.serialization.object({
    contestAddress: core.serialization.property(
      'contest_address',
      core.serialization.string(),
    ),
    contestId: core.serialization.property(
      'contest_id',
      core.serialization.number(),
    ),
    contentId: core.serialization.property(
      'content_id',
      core.serialization.number(),
    ),
    actorAddress: core.serialization.property(
      'actor_address',
      core.serialization.string(),
    ),
    action: CreateGroupResponseContestManagersItemContestsItemActionsItemAction,
    contentUrl: core.serialization.property(
      'content_url',
      core.serialization.string().optional(),
    ),
    threadId: core.serialization.property(
      'thread_id',
      core.serialization.number().optional(),
    ),
    threadTitle: core.serialization.property(
      'thread_title',
      core.serialization.string().optional(),
    ),
    votingPower: core.serialization.property(
      'voting_power',
      core.serialization.number(),
    ),
    createdAt: core.serialization.property(
      'created_at',
      core.serialization.date(),
    ),
  });
