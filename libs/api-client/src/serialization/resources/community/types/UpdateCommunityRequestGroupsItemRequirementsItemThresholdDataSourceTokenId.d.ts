/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { UpdateCommunityRequestGroupsItemRequirementsItemThresholdDataSourceTokenIdSourceType } from './UpdateCommunityRequestGroupsItemRequirementsItemThresholdDataSourceTokenIdSourceType';
export declare const UpdateCommunityRequestGroupsItemRequirementsItemThresholdDataSourceTokenId: core.serialization.ObjectSchema<
  serializers.UpdateCommunityRequestGroupsItemRequirementsItemThresholdDataSourceTokenId.Raw,
  CommonApi.UpdateCommunityRequestGroupsItemRequirementsItemThresholdDataSourceTokenId
>;
export declare namespace UpdateCommunityRequestGroupsItemRequirementsItemThresholdDataSourceTokenId {
  interface Raw {
    source_type: UpdateCommunityRequestGroupsItemRequirementsItemThresholdDataSourceTokenIdSourceType.Raw;
    evm_chain_id: number;
    contract_address: string;
    token_id?: string | null;
  }
}