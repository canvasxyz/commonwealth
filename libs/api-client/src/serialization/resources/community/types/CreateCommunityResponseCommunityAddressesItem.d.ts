/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateCommunityResponseCommunityAddressesItemRole } from './CreateCommunityResponseCommunityAddressesItemRole';
import { CreateCommunityResponseCommunityAddressesItemUser } from './CreateCommunityResponseCommunityAddressesItemUser';
import { CreateCommunityResponseCommunityAddressesItemWalletId } from './CreateCommunityResponseCommunityAddressesItemWalletId';

export declare const CreateCommunityResponseCommunityAddressesItem: core.serialization.ObjectSchema<
  serializers.CreateCommunityResponseCommunityAddressesItem.Raw,
  CommonApi.CreateCommunityResponseCommunityAddressesItem
>;
export declare namespace CreateCommunityResponseCommunityAddressesItem {
  interface Raw {
    id?: number | null;
    address: string;
    community_id: string;
    user_id?: number | null;
    verification_token?: string | null;
    verification_token_expires?: string | null;
    verified?: string | null;
    last_active?: string | null;
    ghost_address?: boolean | null;
    wallet_id?: CreateCommunityResponseCommunityAddressesItemWalletId.Raw | null;
    block_info?: string | null;
    is_user_default?: boolean | null;
    role?: CreateCommunityResponseCommunityAddressesItemRole.Raw | null;
    is_banned?: boolean | null;
    hex?: string | null;
    User?: CreateCommunityResponseCommunityAddressesItemUser.Raw | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
}
