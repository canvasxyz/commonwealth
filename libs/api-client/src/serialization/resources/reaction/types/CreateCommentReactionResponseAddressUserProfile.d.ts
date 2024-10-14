/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateCommentReactionResponseAddressUserProfileBackgroundImage } from './CreateCommentReactionResponseAddressUserProfileBackgroundImage';

export declare const CreateCommentReactionResponseAddressUserProfile: core.serialization.ObjectSchema<
  serializers.CreateCommentReactionResponseAddressUserProfile.Raw,
  CommonApi.CreateCommentReactionResponseAddressUserProfile
>;
export declare namespace CreateCommentReactionResponseAddressUserProfile {
  interface Raw {
    name?: string | null;
    email?: string | null;
    website?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    slug?: string | null;
    socials?: string[] | null;
    background_image?: CreateCommentReactionResponseAddressUserProfileBackgroundImage.Raw | null;
  }
}
