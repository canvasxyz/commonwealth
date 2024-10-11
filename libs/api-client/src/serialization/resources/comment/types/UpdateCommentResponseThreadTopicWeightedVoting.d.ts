/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';

export declare const UpdateCommentResponseThreadTopicWeightedVoting: core.serialization.Schema<
  serializers.UpdateCommentResponseThreadTopicWeightedVoting.Raw,
  CommonApi.UpdateCommentResponseThreadTopicWeightedVoting
>;
export declare namespace UpdateCommentResponseThreadTopicWeightedVoting {
  type Raw = 'stake' | 'erc20';
}
