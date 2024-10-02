/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from "../../../index";
export interface UpdateCommentResponseReactionAddress {
    id?: number;
    address: string;
    communityId: string;
    userId?: number;
    verificationToken?: string;
    verificationTokenExpires?: Date;
    verified?: Date;
    lastActive?: Date;
    ghostAddress?: boolean;
    walletId?: CommonApi.UpdateCommentResponseReactionAddressWalletId;
    blockInfo?: string;
    isUserDefault?: boolean;
    role?: CommonApi.UpdateCommentResponseReactionAddressRole;
    isBanned?: boolean;
    hex?: string;
    user?: CommonApi.UpdateCommentResponseReactionAddressUser;
    createdAt?: Date;
    updatedAt?: Date;
}
