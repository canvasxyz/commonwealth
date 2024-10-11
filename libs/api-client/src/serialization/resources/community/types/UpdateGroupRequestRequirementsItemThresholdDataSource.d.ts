/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { UpdateGroupRequestRequirementsItemThresholdDataSourceOne } from './UpdateGroupRequestRequirementsItemThresholdDataSourceOne';
import { UpdateGroupRequestRequirementsItemThresholdDataSourceThree } from './UpdateGroupRequestRequirementsItemThresholdDataSourceThree';
import { UpdateGroupRequestRequirementsItemThresholdDataSourceTokenId } from './UpdateGroupRequestRequirementsItemThresholdDataSourceTokenId';
import { UpdateGroupRequestRequirementsItemThresholdDataSourceTokenSymbol } from './UpdateGroupRequestRequirementsItemThresholdDataSourceTokenSymbol';

export declare const UpdateGroupRequestRequirementsItemThresholdDataSource: core.serialization.Schema<
  serializers.UpdateGroupRequestRequirementsItemThresholdDataSource.Raw,
  CommonApi.UpdateGroupRequestRequirementsItemThresholdDataSource
>;
export declare namespace UpdateGroupRequestRequirementsItemThresholdDataSource {
  type Raw =
    | UpdateGroupRequestRequirementsItemThresholdDataSourceTokenId.Raw
    | UpdateGroupRequestRequirementsItemThresholdDataSourceOne.Raw
    | UpdateGroupRequestRequirementsItemThresholdDataSourceTokenSymbol.Raw
    | UpdateGroupRequestRequirementsItemThresholdDataSourceThree.Raw;
}
