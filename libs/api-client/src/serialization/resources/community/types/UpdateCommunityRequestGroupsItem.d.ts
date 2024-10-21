/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { UpdateCommunityRequestGroupsItemMetadata } from './UpdateCommunityRequestGroupsItemMetadata';
import { UpdateCommunityRequestGroupsItemRequirementsItem } from './UpdateCommunityRequestGroupsItemRequirementsItem';
export declare const UpdateCommunityRequestGroupsItem: core.serialization.ObjectSchema<
  serializers.UpdateCommunityRequestGroupsItem.Raw,
  CommonApi.UpdateCommunityRequestGroupsItem
>;
export declare namespace UpdateCommunityRequestGroupsItem {
  interface Raw {
    id?: number | null;
    community_id: string;
    metadata: UpdateCommunityRequestGroupsItemMetadata.Raw;
    requirements: UpdateCommunityRequestGroupsItemRequirementsItem.Raw[];
    is_system_managed?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
}