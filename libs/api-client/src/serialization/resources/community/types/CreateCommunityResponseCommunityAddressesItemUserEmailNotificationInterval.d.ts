/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const CreateCommunityResponseCommunityAddressesItemUserEmailNotificationInterval: core.serialization.Schema<
  serializers.CreateCommunityResponseCommunityAddressesItemUserEmailNotificationInterval.Raw,
  CommonApi.CreateCommunityResponseCommunityAddressesItemUserEmailNotificationInterval
>;
export declare namespace CreateCommunityResponseCommunityAddressesItemUserEmailNotificationInterval {
  type Raw = 'weekly' | 'never';
}