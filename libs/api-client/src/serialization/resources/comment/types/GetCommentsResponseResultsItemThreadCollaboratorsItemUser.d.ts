/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { GetCommentsResponseResultsItemThreadCollaboratorsItemUserApiKey } from './GetCommentsResponseResultsItemThreadCollaboratorsItemUserApiKey';
import { GetCommentsResponseResultsItemThreadCollaboratorsItemUserEmailNotificationInterval } from './GetCommentsResponseResultsItemThreadCollaboratorsItemUserEmailNotificationInterval';
import { GetCommentsResponseResultsItemThreadCollaboratorsItemUserProfile } from './GetCommentsResponseResultsItemThreadCollaboratorsItemUserProfile';
import { GetCommentsResponseResultsItemThreadCollaboratorsItemUserProfileTagsItem } from './GetCommentsResponseResultsItemThreadCollaboratorsItemUserProfileTagsItem';
export declare const GetCommentsResponseResultsItemThreadCollaboratorsItemUser: core.serialization.ObjectSchema<
  serializers.GetCommentsResponseResultsItemThreadCollaboratorsItemUser.Raw,
  CommonApi.GetCommentsResponseResultsItemThreadCollaboratorsItemUser
>;
export declare namespace GetCommentsResponseResultsItemThreadCollaboratorsItemUser {
  interface Raw {
    id?: number | null;
    email?: string | null;
    isAdmin?: boolean | null;
    disableRichText?: boolean | null;
    emailVerified?: boolean | null;
    selected_community_id?: string | null;
    emailNotificationInterval?: GetCommentsResponseResultsItemThreadCollaboratorsItemUserEmailNotificationInterval.Raw | null;
    promotional_emails_enabled?: boolean | null;
    is_welcome_onboard_flow_complete?: boolean | null;
    profile: GetCommentsResponseResultsItemThreadCollaboratorsItemUserProfile.Raw;
    xp_points?: number | null;
    ProfileTags?:
      | GetCommentsResponseResultsItemThreadCollaboratorsItemUserProfileTagsItem.Raw[]
      | null;
    ApiKey?: GetCommentsResponseResultsItemThreadCollaboratorsItemUserApiKey.Raw | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
}