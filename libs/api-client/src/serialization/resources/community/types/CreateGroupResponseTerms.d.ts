/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateGroupResponseTermsZero } from './CreateGroupResponseTermsZero';

export declare const CreateGroupResponseTerms: core.serialization.Schema<
  serializers.CreateGroupResponseTerms.Raw,
  CommonApi.CreateGroupResponseTerms
>;
export declare namespace CreateGroupResponseTerms {
  type Raw = CreateGroupResponseTermsZero.Raw | string;
}
