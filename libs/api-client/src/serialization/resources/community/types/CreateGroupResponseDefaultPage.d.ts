/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
export declare const CreateGroupResponseDefaultPage: core.serialization.Schema<
  serializers.CreateGroupResponseDefaultPage.Raw,
  CommonApi.CreateGroupResponseDefaultPage
>;
export declare namespace CreateGroupResponseDefaultPage {
  type Raw =
    | 'default_all_discussions_view'
    | 'default_summary_view'
    | 'homepage';
}