/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const UpdateCommunityResponseAddressesItemUserEmailNotificationInterval: core.serialization.Schema<
  serializers.UpdateCommunityResponseAddressesItemUserEmailNotificationInterval.Raw,
  CommonApi.UpdateCommunityResponseAddressesItemUserEmailNotificationInterval
>;
export declare namespace UpdateCommunityResponseAddressesItemUserEmailNotificationInterval {
  type Raw = 'weekly' | 'never';
}