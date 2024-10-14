/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../../api/index';
import * as core from '../../../../../core';
import * as serializers from '../../../../index';

export declare const DeleteThreadRequest: core.serialization.Schema<
  serializers.DeleteThreadRequest.Raw,
  CommonApi.DeleteThreadRequest
>;
export declare namespace DeleteThreadRequest {
  interface Raw {
    thread_id: number;
    canvas_signed_data?: string | null;
    canvas_msg_id?: string | null;
  }
}
