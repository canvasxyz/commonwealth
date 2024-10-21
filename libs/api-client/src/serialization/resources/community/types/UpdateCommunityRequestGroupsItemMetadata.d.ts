/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const UpdateCommunityRequestGroupsItemMetadata: core.serialization.ObjectSchema<
  serializers.UpdateCommunityRequestGroupsItemMetadata.Raw,
  CommonApi.UpdateCommunityRequestGroupsItemMetadata
>;
export declare namespace UpdateCommunityRequestGroupsItemMetadata {
  interface Raw {
    name: string;
    description: string;
    required_requirements?: number | null;
    membership_ttl?: number | null;
  }
}