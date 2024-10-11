/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as CommonApi from '../../../index';

export interface GetCommentsResponseResultsItemThreadReactionsItemAddressUser {
  id?: number;
  email?: string;
  isAdmin?: boolean;
  disableRichText?: boolean;
  emailVerified?: boolean;
  selectedCommunityId?: string;
  emailNotificationInterval?: CommonApi.GetCommentsResponseResultsItemThreadReactionsItemAddressUserEmailNotificationInterval;
  promotionalEmailsEnabled?: boolean;
  isWelcomeOnboardFlowComplete?: boolean;
  profile: CommonApi.GetCommentsResponseResultsItemThreadReactionsItemAddressUserProfile;
  xpPoints?: number;
  profileTags?: CommonApi.GetCommentsResponseResultsItemThreadReactionsItemAddressUserProfileTagsItem[];
  apiKey?: CommonApi.GetCommentsResponseResultsItemThreadReactionsItemAddressUserApiKey;
  createdAt?: Date;
  updatedAt?: Date;
}
