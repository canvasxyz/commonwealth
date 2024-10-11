/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { UpdateCommunityResponseGroupsItemRequirementsItemThresholdData } from './UpdateCommunityResponseGroupsItemRequirementsItemThresholdData';

export declare const UpdateCommunityResponseGroupsItemRequirementsItemThreshold: core.serialization.ObjectSchema<
  serializers.UpdateCommunityResponseGroupsItemRequirementsItemThreshold.Raw,
  CommonApi.UpdateCommunityResponseGroupsItemRequirementsItemThreshold
>;
export declare namespace UpdateCommunityResponseGroupsItemRequirementsItemThreshold {
  interface Raw {
    data: UpdateCommunityResponseGroupsItemRequirementsItemThresholdData.Raw;
  }
}
