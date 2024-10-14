/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';

export declare const GetCommunitiesResponseResultsItemBase: core.serialization.Schema<
  serializers.GetCommunitiesResponseResultsItemBase.Raw,
  CommonApi.GetCommunitiesResponseResultsItemBase
>;
export declare namespace GetCommunitiesResponseResultsItemBase {
  type Raw = 'cosmos' | 'substrate' | 'ethereum' | 'near' | 'solana';
}
