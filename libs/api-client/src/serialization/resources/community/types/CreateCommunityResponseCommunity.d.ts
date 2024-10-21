/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../../api/index';
import * as core from '../../../../core';
import * as serializers from '../../../index';
import { CreateCommunityResponseCommunityAddressesItem } from './CreateCommunityResponseCommunityAddressesItem';
import { CreateCommunityResponseCommunityBase } from './CreateCommunityResponseCommunityBase';
import { CreateCommunityResponseCommunityChainNode } from './CreateCommunityResponseCommunityChainNode';
import { CreateCommunityResponseCommunityCommunityStakesItem } from './CreateCommunityResponseCommunityCommunityStakesItem';
import { CreateCommunityResponseCommunityCommunityTagsItem } from './CreateCommunityResponseCommunityCommunityTagsItem';
import { CreateCommunityResponseCommunityContestManagersItem } from './CreateCommunityResponseCommunityContestManagersItem';
import { CreateCommunityResponseCommunityDefaultPage } from './CreateCommunityResponseCommunityDefaultPage';
import { CreateCommunityResponseCommunityGroupsItem } from './CreateCommunityResponseCommunityGroupsItem';
import { CreateCommunityResponseCommunityHasHomepage } from './CreateCommunityResponseCommunityHasHomepage';
import { CreateCommunityResponseCommunitySocialLinksItem } from './CreateCommunityResponseCommunitySocialLinksItem';
import { CreateCommunityResponseCommunityTerms } from './CreateCommunityResponseCommunityTerms';
import { CreateCommunityResponseCommunityTopicsItem } from './CreateCommunityResponseCommunityTopicsItem';
import { CreateCommunityResponseCommunityType } from './CreateCommunityResponseCommunityType';
export declare const CreateCommunityResponseCommunity: core.serialization.ObjectSchema<
  serializers.CreateCommunityResponseCommunity.Raw,
  CommonApi.CreateCommunityResponseCommunity
>;
export declare namespace CreateCommunityResponseCommunity {
  interface Raw {
    id: string;
    name: string;
    chain_node_id?: number | null;
    default_symbol?: string | null;
    network?: string | null;
    base: CreateCommunityResponseCommunityBase.Raw;
    icon_url?: string | null;
    active: boolean;
    type?: CreateCommunityResponseCommunityType.Raw | null;
    description?: string | null;
    social_links?: CreateCommunityResponseCommunitySocialLinksItem.Raw[] | null;
    ss58_prefix?: number | null;
    stages_enabled?: boolean | null;
    custom_stages?: string[] | null;
    custom_domain?: string | null;
    block_explorer_ids?: string | null;
    collapsed_on_homepage?: boolean | null;
    default_summary_view?: boolean | null;
    default_page?: CreateCommunityResponseCommunityDefaultPage.Raw | null;
    has_homepage?: CreateCommunityResponseCommunityHasHomepage.Raw | null;
    terms?: CreateCommunityResponseCommunityTerms.Raw | null;
    admin_only_polling?: boolean | null;
    bech32_prefix?: string | null;
    hide_projects?: boolean | null;
    token_name?: string | null;
    ce_verbose?: boolean | null;
    discord_config_id?: number | null;
    category?: unknown | null;
    discord_bot_webhooks_enabled?: boolean | null;
    directory_page_enabled?: boolean | null;
    directory_page_chain_node_id?: number | null;
    namespace?: string | null;
    namespace_address?: string | null;
    redirect?: string | null;
    snapshot_spaces?: string[] | null;
    include_in_digest_email?: boolean | null;
    profile_count?: number | null;
    lifetime_thread_count?: number | null;
    banner_text?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    Addresses?: CreateCommunityResponseCommunityAddressesItem.Raw[] | null;
    CommunityStakes?:
      | CreateCommunityResponseCommunityCommunityStakesItem.Raw[]
      | null;
    CommunityTags?:
      | CreateCommunityResponseCommunityCommunityTagsItem.Raw[]
      | null;
    ChainNode?: CreateCommunityResponseCommunityChainNode.Raw | null;
    topics?: CreateCommunityResponseCommunityTopicsItem.Raw[] | null;
    groups?: CreateCommunityResponseCommunityGroupsItem.Raw[] | null;
    contest_managers?:
      | CreateCommunityResponseCommunityContestManagersItem.Raw[]
      | null;
  }
}