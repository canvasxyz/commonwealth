/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const GetMembersRequestMemberships: core.serialization.Schema<
  serializers.GetMembersRequestMemberships.Raw,
  CommonApi.GetMembersRequestMemberships
>;
export declare namespace GetMembersRequestMemberships {
  type Raw =
    | 'in-group'
    | 'not-in-group'
    | 'allow-specified-addresses'
    | 'not-allow-specified-addresses';
}