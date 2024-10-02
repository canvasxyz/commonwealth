/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from "../../../index";
export interface GetCommunityResponseAddressesAddressesItem {
    id?: number;
    address: string;
    communityId: string;
    userId?: number;
    verificationToken?: string;
    verificationTokenExpires?: Date;
    verified?: Date;
    lastActive?: Date;
    ghostAddress?: boolean;
    walletId?: CommonApi.GetCommunityResponseAddressesAddressesItemWalletId;
    blockInfo?: string;
    isUserDefault?: boolean;
    role?: CommonApi.GetCommunityResponseAddressesAddressesItemRole;
    isBanned?: boolean;
    hex?: string;
    user?: CommonApi.GetCommunityResponseAddressesAddressesItemUser;
    createdAt?: Date;
    updatedAt?: Date;
}
