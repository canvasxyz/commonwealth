/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from '../../../../core';
import { CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceOne } from './CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceOne';
import { CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceThree } from './CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceThree';
import { CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceTokenId } from './CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceTokenId';
import { CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceTokenSymbol } from './CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceTokenSymbol';

export const CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSource =
  core.serialization.undiscriminatedUnion([
    CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceTokenId,
    CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceOne,
    CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceTokenSymbol,
    CreateCommunityResponseCommunityGroupsItemRequirementsItemThresholdDataSourceThree,
  ]);
