/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from '../../../../core';
import { GetCommentsResponseResultsItemDiscordMetaUser } from './GetCommentsResponseResultsItemDiscordMetaUser';

export const GetCommentsResponseResultsItemDiscordMeta =
  core.serialization.object({
    user: GetCommentsResponseResultsItemDiscordMetaUser,
    channelId: core.serialization.property(
      'channel_id',
      core.serialization.string(),
    ),
    messageId: core.serialization.property(
      'message_id',
      core.serialization.string(),
    ),
  });
