import { CommentAttributes } from '@hicommonwealth/model';
import {
  fromCanvasSignedDataApiArgs,
  hasCanvasSignedDataApiArgs,
  verifyDeleteComment,
} from '@hicommonwealth/shared';
import { config } from '../../config';
import { ServerControllers } from '../../routing/router';
import { TypedRequest, TypedResponse, success } from '../../types';

type DeleteCommentRequestBody = {
  canvas_signed_data?: string;
  canvas_msg_id?: string;
};
type DeleteCommentRequestParams = {
  id: string;
};
type DeleteCommentResponse = CommentAttributes;

export const deleteCommentHandler = async (
  controllers: ServerControllers,
  req: TypedRequest<DeleteCommentRequestBody, {}, DeleteCommentRequestParams>,
  res: TypedResponse<DeleteCommentResponse>,
) => {
  const { user, address } = req;
  const { id: commentId } = req.params!;

  // @ts-expect-error StrictNullChecks
  const threadFields: DeleteCommentOptions = { user, address, commentId };

  if (hasCanvasSignedDataApiArgs(req.body)) {
    threadFields.canvasSignedData = req.body.canvas_signed_data;
    threadFields.canvasMsgId = req.body.canvas_msg_id;

    if (config.ENFORCE_SESSION_KEYS) {
      const { canvasSignedData } = fromCanvasSignedDataApiArgs(req.body);

      await verifyDeleteComment(canvasSignedData, {
        id: commentId,
      });
    }
  }

  await controllers.comments.deleteComment({
    // @ts-expect-error StrictNullChecks
    user,
    // @ts-expect-error StrictNullChecks
    address,
    commentId: parseInt(commentId, 10),
  });

  return success(res, undefined);
};
