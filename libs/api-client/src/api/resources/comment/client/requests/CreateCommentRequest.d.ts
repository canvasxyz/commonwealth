/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../index';

/**
 * @example
 *     {
 *         threadId: 1,
 *         text: "text"
 *     }
 */
export interface CreateCommentRequest {
  threadId: number;
  threadMsgId?: string;
  text: string;
  parentId?: number;
  parentMsgId?: string;
  canvasSignedData?: string;
  canvasMsgId?: string;
  discordMeta?: CommonApi.CreateCommentRequestDiscordMeta;
}
