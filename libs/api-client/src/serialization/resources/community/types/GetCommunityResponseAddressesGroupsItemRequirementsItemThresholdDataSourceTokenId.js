/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from '../../../../core';
import { GetCommunityResponseAddressesGroupsItemRequirementsItemThresholdDataSourceTokenIdSourceType } from './GetCommunityResponseAddressesGroupsItemRequirementsItemThresholdDataSourceTokenIdSourceType';
export const GetCommunityResponseAddressesGroupsItemRequirementsItemThresholdDataSourceTokenId =
  core.serialization.object({
    sourceType: core.serialization.property(
      'source_type',
      GetCommunityResponseAddressesGroupsItemRequirementsItemThresholdDataSourceTokenIdSourceType,
    ),
    evmChainId: core.serialization.property(
      'evm_chain_id',
      core.serialization.number(),
    ),
    contractAddress: core.serialization.property(
      'contract_address',
      core.serialization.string(),
    ),
    tokenId: core.serialization.property(
      'token_id',
      core.serialization.string().optional(),
    ),
  });