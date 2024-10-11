/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';

export declare const GetCommentsResponseResultsItemAddressUserProfileBackgroundImage: core.serialization.ObjectSchema<
  serializers.GetCommentsResponseResultsItemAddressUserProfileBackgroundImage.Raw,
  CommonApi.GetCommentsResponseResultsItemAddressUserProfileBackgroundImage
>;
export declare namespace GetCommentsResponseResultsItemAddressUserProfileBackgroundImage {
  interface Raw {
    url?: string | null;
    imageBehavior?: string | null;
  }
}
