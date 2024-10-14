/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItemStakeDirection } from './CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItemStakeDirection';

export declare const CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem: core.serialization.ObjectSchema<
  serializers.CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem.Raw,
  CommonApi.CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem
>;
export declare namespace CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItem {
  interface Raw {
    transaction_hash: string;
    community_id: string;
    stake_id?: number | null;
    address: string;
    stake_amount: number;
    stake_price?: string | null;
    stake_direction: CreateCommunityResponseCommunityCommunityStakesItemStakeTransactionsItemStakeDirection.Raw;
    timestamp: number;
  }
}
