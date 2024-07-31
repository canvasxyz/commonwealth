import { AppError } from '@hicommonwealth/core';
import {
  fromCanvasSignedDataApiArgs,
  hasCanvasSignedDataApiArgs,
  verifyDeleteThread,
} from '@hicommonwealth/shared';
import { DeleteThreadOptions } from 'server/controllers/server_threads_methods/delete_thread';
import { config } from '../../config';
import { ServerControllers } from '../../routing/router';
import { TypedRequest, TypedResponse, success } from '../../types';

const Errors = {
  InvalidThreadID: 'Invalid thread ID',
};

type DeleteThreadRequestBody = {
  canvas_signed_data?: string;
  canvas_msg_id?: string;
};
type DeleteThreadRequestParams = { id: string };
type DeleteThreadResponse = void;

export const deleteThreadHandler = async (
  controllers: ServerControllers,
  req: TypedRequest<DeleteThreadRequestBody, {}, DeleteThreadRequestParams>,
  res: TypedResponse<DeleteThreadResponse>,
) => {
  const { user, address } = req;
  const { id } = req.params!;

  const threadId = parseInt(id, 10) || 0;
  if (!threadId) {
    throw new AppError(Errors.InvalidThreadID);
  }

  // @ts-expect-error StrictNullChecks
  let threadFields: DeleteThreadOptions = { user, address, threadId };

  if (hasCanvasSignedDataApiArgs(req.body)) {
    threadFields.canvasSignedData = req.body.canvas_signed_data;
    threadFields.canvasMsgId = req.body.canvas_msg_id;

    if (config.ENFORCE_SESSION_KEYS) {
      const { canvasSignedData } = fromCanvasSignedDataApiArgs(req.body);

      await verifyDeleteThread(canvasSignedData, {
        id,
      });
    }
  }

  await controllers.threads.deleteThread(threadFields);

  return success(res, undefined);
};
