/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as CommonApi from "../../../../api/index";
import * as core from "../../../../core";
export declare const CreateCommentResponseReactionAddressWalletId: core.serialization.Schema<serializers.CreateCommentResponseReactionAddressWalletId.Raw, CommonApi.CreateCommentResponseReactionAddressWalletId>;
export declare namespace CreateCommentResponseReactionAddressWalletId {
    type Raw = "magic" | "polkadot" | "metamask" | "walletconnect" | "keplr-ethereum" | "keplr" | "leap" | "near" | "terrastation" | "terra-walletconnect" | "cosm-metamask" | "phantom" | "coinbase";
}
