/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { GetCommunitiesResponseResultsItemAddressesItemUserProfileBackgroundImage } from './GetCommunitiesResponseResultsItemAddressesItemUserProfileBackgroundImage';
export declare const GetCommunitiesResponseResultsItemAddressesItemUserProfile: core.serialization.ObjectSchema<
  serializers.GetCommunitiesResponseResultsItemAddressesItemUserProfile.Raw,
  CommonApi.GetCommunitiesResponseResultsItemAddressesItemUserProfile
>;
export declare namespace GetCommunitiesResponseResultsItemAddressesItemUserProfile {
  interface Raw {
    name?: string | null;
    email?: string | null;
    website?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    slug?: string | null;
    socials?: string[] | null;
    background_image?: GetCommunitiesResponseResultsItemAddressesItemUserProfileBackgroundImage.Raw | null;
  }
}