// This is our in memory provider setup. It does not automatically ensure your
// feature flag is set on our Unleash instance (May not be available on prod).
//
// See knowledge_base/Feature-Flags.md for more info.

import { InMemoryProvider } from '@openfeature/web-sdk';
import { UnleashClient } from 'unleash-proxy-client';
import { UnleashProvider } from '../../../shared/UnleashProvider';

const buildFlag = (env: string) => {
  return {
    variants: {
      on: true,
      off: false,
    },
    disabled: false,
    defaultVariant: env === 'true' ? 'on' : 'off',
  };
};

const featureFlags = {
  contest: buildFlag(process.env.FLAG_CONTEST),
  proposalTemplates: buildFlag(process.env.FLAG_PROPOSAL_TEMPLATES),
  communityHomepage: buildFlag(process.env.FLAG_COMMUNITY_HOMEPAGE),
  communityStake: buildFlag(process.env.FLAG_COMMUNITY_STAKE),
  myCommunityStakePageEnabled: buildFlag(
    process.env.FLAG_MY_COMMUNITY_STAKE_PAGE_ENABLED,
  ),
  existingCommunityStakeIntegrationEnabled: buildFlag(
    process.env.FLAG_EXISTING_COMMUNITY_STAKE_INTEGRATION_ENABLED,
  ),
  userOnboardingEnabled: buildFlag(process.env.FLAG_USER_ONBOARDING_ENABLED),
};

export type AvailableFeatureFlag = keyof typeof featureFlags;

const unleashConfig = {
  url: process.env.UNLEASH_FRONTEND_SERVER_URL,
  clientKey: process.env.UNLEASH_FRONTEND_API_TOKEN,
  refreshInterval: 120,
  appName: process.env.HEROKU_APP_NAME,
};

export const openFeatureProvider = process.env.UNLEASH_FRONTEND_API_TOKEN
  ? new UnleashProvider(new UnleashClient(unleashConfig))
  : new InMemoryProvider(featureFlags);
