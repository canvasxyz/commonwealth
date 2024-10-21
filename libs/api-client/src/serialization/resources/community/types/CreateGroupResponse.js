/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as core from '../../../../core';
import { CreateGroupResponseAddressesItem } from './CreateGroupResponseAddressesItem';
import { CreateGroupResponseBase } from './CreateGroupResponseBase';
import { CreateGroupResponseChainNode } from './CreateGroupResponseChainNode';
import { CreateGroupResponseCommunityStakesItem } from './CreateGroupResponseCommunityStakesItem';
import { CreateGroupResponseCommunityTagsItem } from './CreateGroupResponseCommunityTagsItem';
import { CreateGroupResponseContestManagersItem } from './CreateGroupResponseContestManagersItem';
import { CreateGroupResponseDefaultPage } from './CreateGroupResponseDefaultPage';
import { CreateGroupResponseGroupsItem } from './CreateGroupResponseGroupsItem';
import { CreateGroupResponseHasHomepage } from './CreateGroupResponseHasHomepage';
import { CreateGroupResponseSocialLinksItem } from './CreateGroupResponseSocialLinksItem';
import { CreateGroupResponseTerms } from './CreateGroupResponseTerms';
import { CreateGroupResponseTopicsItem } from './CreateGroupResponseTopicsItem';
import { CreateGroupResponseType } from './CreateGroupResponseType';
export const CreateGroupResponse = core.serialization.object({
  id: core.serialization.string().optional(),
  name: core.serialization.string().optional(),
  chainNodeId: core.serialization.property(
    'chain_node_id',
    core.serialization.number().optional(),
  ),
  defaultSymbol: core.serialization.property(
    'default_symbol',
    core.serialization.string().optional(),
  ),
  network: core.serialization.string().optional(),
  base: CreateGroupResponseBase.optional(),
  iconUrl: core.serialization.property(
    'icon_url',
    core.serialization.string().optional(),
  ),
  active: core.serialization.boolean().optional(),
  type: CreateGroupResponseType.optional(),
  description: core.serialization.string().optional(),
  socialLinks: core.serialization.property(
    'social_links',
    core.serialization.list(CreateGroupResponseSocialLinksItem).optional(),
  ),
  ss58Prefix: core.serialization.property(
    'ss58_prefix',
    core.serialization.number().optional(),
  ),
  stagesEnabled: core.serialization.property(
    'stages_enabled',
    core.serialization.boolean().optional(),
  ),
  customStages: core.serialization.property(
    'custom_stages',
    core.serialization.list(core.serialization.string()).optional(),
  ),
  customDomain: core.serialization.property(
    'custom_domain',
    core.serialization.string().optional(),
  ),
  blockExplorerIds: core.serialization.property(
    'block_explorer_ids',
    core.serialization.string().optional(),
  ),
  collapsedOnHomepage: core.serialization.property(
    'collapsed_on_homepage',
    core.serialization.boolean().optional(),
  ),
  defaultSummaryView: core.serialization.property(
    'default_summary_view',
    core.serialization.boolean().optional(),
  ),
  defaultPage: core.serialization.property(
    'default_page',
    CreateGroupResponseDefaultPage.optional(),
  ),
  hasHomepage: core.serialization.property(
    'has_homepage',
    CreateGroupResponseHasHomepage.optional(),
  ),
  terms: CreateGroupResponseTerms.optional(),
  adminOnlyPolling: core.serialization.property(
    'admin_only_polling',
    core.serialization.boolean().optional(),
  ),
  bech32Prefix: core.serialization.property(
    'bech32_prefix',
    core.serialization.string().optional(),
  ),
  hideProjects: core.serialization.property(
    'hide_projects',
    core.serialization.boolean().optional(),
  ),
  tokenName: core.serialization.property(
    'token_name',
    core.serialization.string().optional(),
  ),
  ceVerbose: core.serialization.property(
    'ce_verbose',
    core.serialization.boolean().optional(),
  ),
  discordConfigId: core.serialization.property(
    'discord_config_id',
    core.serialization.number().optional(),
  ),
  category: core.serialization.unknown().optional(),
  discordBotWebhooksEnabled: core.serialization.property(
    'discord_bot_webhooks_enabled',
    core.serialization.boolean().optional(),
  ),
  directoryPageEnabled: core.serialization.property(
    'directory_page_enabled',
    core.serialization.boolean().optional(),
  ),
  directoryPageChainNodeId: core.serialization.property(
    'directory_page_chain_node_id',
    core.serialization.number().optional(),
  ),
  namespace: core.serialization.string().optional(),
  namespaceAddress: core.serialization.property(
    'namespace_address',
    core.serialization.string().optional(),
  ),
  redirect: core.serialization.string().optional(),
  snapshotSpaces: core.serialization.property(
    'snapshot_spaces',
    core.serialization.list(core.serialization.string()).optional(),
  ),
  includeInDigestEmail: core.serialization.property(
    'include_in_digest_email',
    core.serialization.boolean().optional(),
  ),
  profileCount: core.serialization.property(
    'profile_count',
    core.serialization.number().optional(),
  ),
  lifetimeThreadCount: core.serialization.property(
    'lifetime_thread_count',
    core.serialization.number().optional(),
  ),
  bannerText: core.serialization.property(
    'banner_text',
    core.serialization.string().optional(),
  ),
  createdAt: core.serialization.property(
    'created_at',
    core.serialization.date().optional(),
  ),
  updatedAt: core.serialization.property(
    'updated_at',
    core.serialization.date().optional(),
  ),
  addresses: core.serialization.property(
    'Addresses',
    core.serialization.list(CreateGroupResponseAddressesItem).optional(),
  ),
  communityStakes: core.serialization.property(
    'CommunityStakes',
    core.serialization.list(CreateGroupResponseCommunityStakesItem).optional(),
  ),
  communityTags: core.serialization.property(
    'CommunityTags',
    core.serialization.list(CreateGroupResponseCommunityTagsItem).optional(),
  ),
  chainNode: core.serialization.property(
    'ChainNode',
    CreateGroupResponseChainNode.optional(),
  ),
  topics: core.serialization.list(CreateGroupResponseTopicsItem).optional(),
  groups: core.serialization.list(CreateGroupResponseGroupsItem).optional(),
  contestManagers: core.serialization.property(
    'contest_managers',
    core.serialization.list(CreateGroupResponseContestManagersItem).optional(),
  ),
});