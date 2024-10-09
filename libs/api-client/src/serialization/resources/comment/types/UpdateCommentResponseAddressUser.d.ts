/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { UpdateCommentResponseAddressUserApiKey } from './UpdateCommentResponseAddressUserApiKey';
import { UpdateCommentResponseAddressUserEmailNotificationInterval } from './UpdateCommentResponseAddressUserEmailNotificationInterval';
import { UpdateCommentResponseAddressUserProfile } from './UpdateCommentResponseAddressUserProfile';
import { UpdateCommentResponseAddressUserProfileTagsItem } from './UpdateCommentResponseAddressUserProfileTagsItem';

export declare const UpdateCommentResponseAddressUser: core.serialization.ObjectSchema<
  serializers.UpdateCommentResponseAddressUser.Raw,
  CommonApi.UpdateCommentResponseAddressUser
>;
export declare namespace UpdateCommentResponseAddressUser {
  interface Raw {
    id?: number | null;
    email?: string | null;
    isAdmin?: boolean | null;
    disableRichText?: boolean | null;
    emailVerified?: boolean | null;
    selected_community_id?: string | null;
    emailNotificationInterval?: UpdateCommentResponseAddressUserEmailNotificationInterval.Raw | null;
    promotional_emails_enabled?: boolean | null;
    is_welcome_onboard_flow_complete?: boolean | null;
    profile: UpdateCommentResponseAddressUserProfile.Raw;
    xp_points?: number | null;
    ProfileTags?: UpdateCommentResponseAddressUserProfileTagsItem.Raw[] | null;
    ApiKey?: UpdateCommentResponseAddressUserApiKey.Raw | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
}
