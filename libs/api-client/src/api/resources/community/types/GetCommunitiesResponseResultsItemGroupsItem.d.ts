/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../index';

export interface GetCommunitiesResponseResultsItemGroupsItem {
  id?: number;
  communityId: string;
  metadata: CommonApi.GetCommunitiesResponseResultsItemGroupsItemMetadata;
  requirements: CommonApi.GetCommunitiesResponseResultsItemGroupsItemRequirementsItem[];
  isSystemManaged?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
