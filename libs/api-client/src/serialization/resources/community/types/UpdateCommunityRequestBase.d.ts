/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';

export declare const UpdateCommunityRequestBase: core.serialization.Schema<
  serializers.UpdateCommunityRequestBase.Raw,
  CommonApi.UpdateCommunityRequestBase
>;
export declare namespace UpdateCommunityRequestBase {
  type Raw = 'cosmos' | 'substrate' | 'ethereum' | 'near' | 'solana';
}
