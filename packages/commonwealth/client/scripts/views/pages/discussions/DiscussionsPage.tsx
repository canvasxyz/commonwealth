import {
  GroupTopicPermissionEnum,
  TopicWeightedVoting,
} from '@hicommonwealth/schemas';
import { getProposalUrlPath } from 'identifiers';
import { getScopePrefix, useCommonNavigate } from 'navigation/helpers';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import useFetchThreadsQuery, {
  useDateCursor,
} from 'state/api/threads/fetchThreads';
import {
  ThreadFeaturedFilterTypes,
  ThreadTimelineFilterTypes,
} from '../../../models/types';
import app from '../../../state';
import { useFetchTopicsQuery } from '../../../state/api/topics';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { HeaderWithFilters } from './HeaderWithFilters';
import { ThreadCard } from './ThreadCard';
import { sortByFeaturedFilter, sortPinned } from './helpers';

import { slugify, splitAndDecodeURL } from '@hicommonwealth/shared';
import { formatAddressShort } from 'helpers';
import { getThreadActionTooltipText } from 'helpers/threads';
import useBrowserWindow from 'hooks/useBrowserWindow';
import { useFlag } from 'hooks/useFlag';
import useManageDocumentTitle from 'hooks/useManageDocumentTitle';
import useTopicGating from 'hooks/useTopicGating';
import 'pages/discussions/index.scss';
import { useGetCommunityByIdQuery } from 'state/api/communities';
import { useFetchCustomDomainQuery } from 'state/api/configuration';
import useUserStore from 'state/ui/user';
import Permissions from 'utils/Permissions';
import { checkIsTopicInContest } from 'views/components/NewThreadFormLegacy/helpers';
import TokenBanner from 'views/components/TokenBanner';
import CWPageLayout from 'views/components/component_kit/new_designs/CWPageLayout';
import useCommunityContests from 'views/pages/CommunityManagement/Contests/useCommunityContests';
import { isContestActive } from 'views/pages/CommunityManagement/Contests/utils';
import useTokenMetadataQuery from '../../../state/api/tokens/getTokenMetadata';
import { AdminOnboardingSlider } from '../../components/AdminOnboardingSlider';
import { UserTrainingSlider } from '../../components/UserTrainingSlider';
import { DiscussionsFeedDiscovery } from './DiscussionsFeedDiscovery';
import { EmptyThreadsPlaceholder } from './EmptyThreadsPlaceholder';

const ETH_CHAIN_NODE_ID = 37;

type DiscussionsPageProps = {
  topicName?: string;
};

const DiscussionsPage = ({ topicName }: DiscussionsPageProps) => {
  const communityId = app.activeChainId() || '';
  const navigate = useCommonNavigate();
  const [includeSpamThreads, setIncludeSpamThreads] = useState<boolean>(false);
  const [includeArchivedThreads, setIncludeArchivedThreads] =
    useState<boolean>(false);
  const [searchParams] = useSearchParams();
  // @ts-expect-error <StrictNullChecks/>
  const stageName: string = searchParams.get('stage');

  const weightedTopicsEnabled = useFlag('weightedTopics');

  const featuredFilter: ThreadFeaturedFilterTypes = searchParams.get(
    'featured',
  ) as ThreadFeaturedFilterTypes;

  const dateRange: ThreadTimelineFilterTypes = searchParams.get(
    'dateRange',
  ) as ThreadTimelineFilterTypes;

  const { data: community } = useGetCommunityByIdQuery({
    id: communityId,
    enabled: !!communityId,
    includeNodeInfo: true,
  });

  const { data: topics, isLoading: isLoadingTopics } = useFetchTopicsQuery({
    communityId,
    apiEnabled: !!communityId,
  });
  const contestAddress = searchParams.get('contest');
  const contestStatus = searchParams.get('status');

  const containerRef = useRef();

  useBrowserWindow({});

  const isAdmin = Permissions.isSiteAdmin() || Permissions.isCommunityAdmin();

  const topicObj = topics?.find(({ name }) => name === topicName);
  const topicId = topicObj?.id;

  const user = useUserStore();

  const { memberships, topicPermissions } = useTopicGating({
    communityId: communityId,
    userAddress: user.activeAccount?.address || '',
    apiEnabled: !!user.activeAccount?.address && !!communityId,
  });

  const { data: domain } = useFetchCustomDomainQuery();

  const { contestsData } = useCommunityContests();

  const { dateCursor } = useDateCursor({
    dateRange: searchParams.get('dateRange') as ThreadTimelineFilterTypes,
  });

  const isOnArchivePage =
    location.pathname ===
    (domain?.isCustomDomain ? `/archived` : `/${app.activeChainId()}/archived`);

  const { data: tokenMetadata } = useTokenMetadataQuery({
    tokenId: topicObj?.tokenAddress || '',
    chainId: ETH_CHAIN_NODE_ID,
  });

  const { fetchNextPage, data, isInitialLoading, hasNextPage } =
    useFetchThreadsQuery({
      communityId: communityId,
      queryType: 'bulk',
      page: 1,
      limit: 20,
      topicId,
      stage: stageName ?? undefined,
      includePinnedThreads: true,
      ...(featuredFilter && {
        orderBy: featuredFilter,
      }),
      toDate: dateCursor.toDate,
      // @ts-expect-error <StrictNullChecks/>
      fromDate: dateCursor.fromDate,
      includeArchivedThreads: isOnArchivePage || includeArchivedThreads,
      // @ts-expect-error <StrictNullChecks/>
      contestAddress,
      // @ts-expect-error <StrictNullChecks/>
      contestStatus,
      apiEnabled: !!communityId,
    });

  const threads = sortPinned(sortByFeaturedFilter(data || [], featuredFilter));

  // Checks if the current page is a discussion page and if the window is small enough to render the mobile menu
  // Checks both for mobile device and inner window size for desktop responsiveness
  const filteredThreads = threads.filter((t) => {
    if (!includeSpamThreads && t.markedAsSpamAt) return null;

    if (!isOnArchivePage && !includeArchivedThreads && t.archivedAt)
      return null;

    if (isOnArchivePage && !t.archivedAt) return null;

    return t;
  });

  //splitAndDecodeURL checks if a url is custom or not and decodes the url after splitting it
  const topicNameFromURL = splitAndDecodeURL(location.pathname);

  //checks for malformed url in topics and redirects if the topic does not exist
  useEffect(() => {
    if (
      !isLoadingTopics &&
      topicNameFromURL &&
      topicNameFromURL !== 'archived'
    ) {
      const validTopics = topics?.some(
        (topic) => topic?.name === topicNameFromURL,
      );
      if (!validTopics) {
        navigate('/discussions');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics, topicNameFromURL, isLoadingTopics]);

  useManageDocumentTitle('Discussions');

  const isTopicWeighted =
    weightedTopicsEnabled &&
    topicId &&
    topicObj.weightedVoting === TopicWeightedVoting.ERC20;

  const activeContestsInTopic = contestsData?.filter((contest) => {
    const isContestInTopic = (contest.topics || []).find(
      (topic) => topic.id === topicId,
    );
    const isActive = isContestActive({ contest });
    return isContestInTopic && isActive;
  });

  return (
    // @ts-expect-error <StrictNullChecks/>
    <CWPageLayout ref={containerRef} className="DiscussionsPageLayout">
      <DiscussionsFeedDiscovery
        orderBy={featuredFilter}
        community={communityId}
        includePinnedThreads={true}
      />
      <Virtuoso
        className="thread-list"
        style={{ height: '100%', width: '100%' }}
        data={isInitialLoading ? [] : filteredThreads}
        customScrollParent={containerRef.current}
        itemContent={(i, thread) => {
          const discussionLink = getProposalUrlPath(
            thread.slug,
            `${thread.identifier}-${slugify(thread.title)}`,
          );

          const isTopicGated = !!(memberships || []).find(
            (membership) =>
              thread?.topic?.id &&
              membership.topics.find((t) => t.id === thread.topic.id),
          );

          const isActionAllowedInGatedTopic = !!(memberships || []).find(
            (membership) =>
              thread?.topic?.id &&
              membership.topics.find((t) => t.id === thread.topic.id) &&
              membership.isAllowed,
          );

          const isRestrictedMembership =
            !isAdmin && isTopicGated && !isActionAllowedInGatedTopic;

          const foundTopicPermissions = topicPermissions.find(
            (tp) => tp.id === thread.topic.id,
          );

          const disabledActionsTooltipText = getThreadActionTooltipText({
            isCommunityMember: !!user.activeAccount,
            isThreadArchived: !!thread?.archivedAt,
            isThreadLocked: !!thread?.lockedAt,
            isThreadTopicGated: isRestrictedMembership,
            threadTopicInteractionRestriction:
              !foundTopicPermissions?.permission?.includes(
                GroupTopicPermissionEnum.UPVOTE,
              )
                ? foundTopicPermissions?.permission
                : undefined,
          });

          const disabledReactPermissionTooltipText = getThreadActionTooltipText(
            {
              isCommunityMember: !!user.activeAccount,
              threadTopicInteractionRestriction:
                !foundTopicPermissions?.permission?.includes(
                  GroupTopicPermissionEnum.UPVOTE,
                )
                  ? foundTopicPermissions?.permission
                  : undefined,
            },
          );

          const disabledCommentPermissionTooltipText =
            getThreadActionTooltipText({
              isCommunityMember: !!user.activeAccount,
              threadTopicInteractionRestriction:
                !foundTopicPermissions?.permission?.includes(
                  GroupTopicPermissionEnum.UPVOTE_AND_COMMENT,
                )
                  ? foundTopicPermissions?.permission
                  : undefined,
            });

          const isThreadTopicInContest = checkIsTopicInContest(
            contestsData,
            thread?.topic?.id,
          );

          return (
            <ThreadCard
              key={thread?.id + '-' + thread.readOnly}
              thread={thread}
              canReact={
                disabledReactPermissionTooltipText
                  ? !disabledReactPermissionTooltipText
                  : !disabledActionsTooltipText
              }
              canComment={
                disabledCommentPermissionTooltipText
                  ? !disabledCommentPermissionTooltipText
                  : !disabledActionsTooltipText
              }
              onEditStart={() => navigate(`${discussionLink}`)}
              onStageTagClick={() => {
                navigate(`/discussions?stage=${thread.stage}`);
              }}
              threadHref={`${getScopePrefix()}${discussionLink}`}
              onBodyClick={() => {
                const scrollEle = document.getElementsByClassName('Body')[0];

                localStorage[`${communityId}-discussions-scrollY`] =
                  scrollEle.scrollTop;
              }}
              onCommentBtnClick={() =>
                navigate(`${discussionLink}?focusComments=true`)
              }
              disabledActionsTooltipText={
                disabledCommentPermissionTooltipText ||
                disabledReactPermissionTooltipText ||
                disabledActionsTooltipText
              }
              hideRecentComments
              editingDisabled={isThreadTopicInContest}
            />
          );
        }}
        endReached={() => {
          hasNextPage && fetchNextPage();
        }}
        overscan={50}
        components={{
          // eslint-disable-next-line react/no-multi-comp
          EmptyPlaceholder: () => (
            <EmptyThreadsPlaceholder
              isInitialLoading={isInitialLoading}
              isOnArchivePage={isOnArchivePage}
            />
          ),
          // eslint-disable-next-line react/no-multi-comp
          Header: () => (
            <>
              <Breadcrumbs />
              <UserTrainingSlider />
              <AdminOnboardingSlider />
              {isTopicWeighted && (
                <TokenBanner
                  name={tokenMetadata?.name}
                  ticker={topicObj?.tokenSymbol}
                  avatarUrl={tokenMetadata?.logo}
                  popover={{
                    title: tokenMetadata?.name,
                    body: formatAddressShort(topicObj.tokenAddress!, 6, 6),
                  }}
                />
              )}

              <HeaderWithFilters
                // @ts-expect-error <StrictNullChecks/>
                topic={topicName}
                stage={stageName}
                featuredFilter={featuredFilter}
                dateRange={dateRange}
                totalThreadCount={
                  isOnArchivePage
                    ? filteredThreads.length || 0
                    : threads
                      ? community?.lifetime_thread_count || 0
                      : 0
                }
                isIncludingSpamThreads={includeSpamThreads}
                onIncludeSpamThreads={setIncludeSpamThreads}
                isIncludingArchivedThreads={includeArchivedThreads}
                onIncludeArchivedThreads={setIncludeArchivedThreads}
                isOnArchivePage={isOnArchivePage}
                activeContests={activeContestsInTopic}
              />
            </>
          ),
        }}
      />
    </CWPageLayout>
  );
};

export default DiscussionsPage;
