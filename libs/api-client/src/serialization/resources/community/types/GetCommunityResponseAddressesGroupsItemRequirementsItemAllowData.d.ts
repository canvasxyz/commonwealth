/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';

export declare const GetCommunityResponseAddressesGroupsItemRequirementsItemAllowData: core.serialization.ObjectSchema<
  serializers.GetCommunityResponseAddressesGroupsItemRequirementsItemAllowData.Raw,
  CommonApi.GetCommunityResponseAddressesGroupsItemRequirementsItemAllowData
>;
export declare namespace GetCommunityResponseAddressesGroupsItemRequirementsItemAllowData {
  interface Raw {
    allow: string[];
  }
}
