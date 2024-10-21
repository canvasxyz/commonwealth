/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateThreadResponseCollaboratorsItemUserProfileBackgroundImage } from './CreateThreadResponseCollaboratorsItemUserProfileBackgroundImage';
export declare const CreateThreadResponseCollaboratorsItemUserProfile: core.serialization.ObjectSchema<
  serializers.CreateThreadResponseCollaboratorsItemUserProfile.Raw,
  CommonApi.CreateThreadResponseCollaboratorsItemUserProfile
>;
export declare namespace CreateThreadResponseCollaboratorsItemUserProfile {
  interface Raw {
    name?: string | null;
    email?: string | null;
    website?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    slug?: string | null;
    socials?: string[] | null;
    background_image?: CreateThreadResponseCollaboratorsItemUserProfileBackgroundImage.Raw | null;
  }
}