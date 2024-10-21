/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const UpdateCommentResponseReactionAddressRole: core.serialization.Schema<
  serializers.UpdateCommentResponseReactionAddressRole.Raw,
  CommonApi.UpdateCommentResponseReactionAddressRole
>;
export declare namespace UpdateCommentResponseReactionAddressRole {
  type Raw = 'admin' | 'moderator' | 'member';
}