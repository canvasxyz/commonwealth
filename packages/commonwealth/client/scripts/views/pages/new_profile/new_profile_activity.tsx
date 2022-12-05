/* @jsx m */

import m from 'mithril';
import moment from 'moment';

import Thread from 'client/scripts/models/Thread';
import ChainInfo from 'client/scripts/models/ChainInfo';
import Comment from 'client/scripts/models/Comment';
import AddressInfo from 'client/scripts/models/AddressInfo';
import { IUniqueId } from 'client/scripts/models/interfaces';
import { CWIcon } from '../../components/component_kit/cw_icons/cw_icon';

import 'pages/new_profile.scss';
import { CWCard } from '../../components/component_kit/cw_card';

type ProfileActivityAttrs = {
  threads: Array<Thread>;
  comments: Array<Comment<IUniqueId>>;
  chains: Array<ChainInfo>;
  addresses: Array<AddressInfo>;
};

enum ProfileActivity {
  Comments,
  Threads,
}

type ProfileActivityState = {
  selectedActivity: ProfileActivity;
  isCommunitiesOpen: boolean;
  isAddressesOpen: boolean;
  communityFilters: any;
  addressFilters: any;
  commentCharLimit: number;
  threadCharLimit: number;
};

const handleActivityClick = (
  option: ProfileActivity,
  state: ProfileActivityState
) => {
  state.selectedActivity = option;
};

const handleCommunityFilterClick = (evt, vnode) => {
  evt.stopPropagation();
  vnode.state.isCommunitiesOpen = !vnode.state.isCommunitiesOpen;
};

const handleAddressFilterClick = (evt, vnode) => {
  evt.stopPropagation();
  vnode.state.isAddressesOpen = !vnode.state.isAddressesOpen;
};

const transformTimestamp = (timestamp) => {
  const fromNow = moment(timestamp).fromNow();
  return fromNow === 'a day ago'
    ? `${moment(Date.now()).diff(timestamp, 'hours')} hours ago`
    : fromNow;
};

const renderActivity = (
  option: ProfileActivity,
  attrs: ProfileActivityAttrs,
  state: ProfileActivityState
) => {
  const shouldFilterCommunities =
    Object.keys(state.communityFilters).length > 0;
  const shouldFilterAddresses = Object.keys(state.addressFilters).length > 0;

  if (option === ProfileActivity.Comments) {
    return attrs.comments
      ?.filter(
        (comment) =>
          // Filter communities
          (!shouldFilterCommunities ||
            comment.chain in state.communityFilters) &&
          // Filter addresses
          (!shouldFilterAddresses ||
            comment.addressInfo.address in state.addressFilters)
      )
      .map((comment) => (
        <div className="activity">
          <div className="comment-icon">
            <CWIcon iconName="feedback" iconSize="small" />
          </div>
          <div className="comment-chain">
            <p>
              {' '}
              Commented in <span className="heavy"> {comment.chain} </span>{' '}
            </p>
          </div>
          <div className="comment-date">
            <p> {transformTimestamp(comment.createdAt)} </p>
          </div>
          <div className="comment-text">
            <p>
              {comment.plaintext.length > state.commentCharLimit
                ? `${comment.plaintext.slice(0, state.commentCharLimit)}...`
                : comment.plaintext}
            </p>
          </div>
        </div>
      ));
  }

  if (option === ProfileActivity.Threads) {
    return attrs.threads
      ?.filter(
        (thread) =>
          // Filter communities
          (!shouldFilterAddresses ||
            thread.addressInfo.address in state.addressFilters) &&
          // Filter addresses
          (!shouldFilterCommunities || thread.chain in state.communityFilters)
      )
      .map((thread) => (
        <div className="activity">
          <div className="comment-icon">
            <CWIcon iconName="feedback" iconSize="small" />
          </div>
          <div className="thread-chain">
            <p>
              {' '}
              Thread in <span className="heavy"> {thread.chain} </span>{' '}
            </p>
          </div>
          <div className="thread-date">
            <p> {transformTimestamp(thread.createdAt)} </p>
          </div>
          <div className="thread-title">
            <p> {thread.title} </p>
          </div>
          <div className="thread-body">
            <p>
              {thread.plaintext.length > state.threadCharLimit
                ? `${thread.plaintext.slice(0, state.threadCharLimit)}...`
                : thread.plaintext}
            </p>
          </div>
        </div>
      ));
  }
};

const handleCommunityFilter = (chain: string, state: ProfileActivityState) => {
  if (chain in state.communityFilters) {
    delete state.communityFilters[chain];
  } else {
    state.communityFilters[chain] = true;
  }
};

const handleAddressFilter = (address: string, state: ProfileActivityState) => {
  if (address in state.addressFilters) {
    delete state.addressFilters[address];
  } else {
    state.addressFilters[address] = true;
  }
};

class NewProfileActivity
  implements m.Component<ProfileActivityAttrs, ProfileActivityState>
{
  oninit(vnode) {
    vnode.state.selectedActivity = ProfileActivity.Comments;
    vnode.state.isCommunitiesOpen = false;
    vnode.state.isAddressesOpen = false;
    vnode.state.communityFilters = {};
    vnode.state.addressFilters = {};
    vnode.state.commentCharLimit = window.innerWidth > 1024 ? 300 : 140;
    vnode.state.threadCharLimit = window.innerWidth > 1024 ? 150 : 55;

    // Handle text character limit
    window.addEventListener('resize', () => {
      vnode.state.commentCharLimit = window.innerWidth > 1024 ? 300 : 140;
      vnode.state.threadCharLimit = window.innerWidth > 1024 ? 150 : 55;
    });

    // Close dropdown
    window.addEventListener('click', (evt) => {
      // If option clicked do nothing
      if (
        (evt.target as HTMLDivElement).classList.contains('option') ||
        (evt.target as HTMLDivElement).classList.contains('option-name')
      ) {
        return;
      }

      if (vnode.state.isCommunitiesOpen) {
        vnode.state.isCommunitiesOpen = false;
        m.redraw();
      }
      if (vnode.state.isAddressesOpen) {
        vnode.state.isAddressesOpen = false;
        m.redraw();
      }
    });
  }

  view(vnode) {
    return (
      <div className="ProfileActivity">
        <CWCard
          interactive={true}
          fullWidth={true}
        >
        <div className="activity-nav">
          <div
            className={
              vnode.state.selectedActivity === ProfileActivity.Comments
                ? 'activity-nav-option selected'
                : 'activity-nav-option'
            }
            onclick={() => {
              handleActivityClick(ProfileActivity.Comments, vnode.state);
            }}
          >
            <h4> Comments </h4>
            <div className="activity-count">
              {' '}
              <p> {vnode.attrs.comments?.length} </p>{' '}
            </div>
          </div>
          <div
            className={
              vnode.state.selectedActivity === ProfileActivity.Threads
                ? 'activity-nav-option selected'
                : 'activity-nav-option'
            }
            onclick={() => {
              handleActivityClick(ProfileActivity.Threads, vnode.state);
            }}
          >
            <h4> Threads </h4>
            <div className="activity-count">
              {' '}
              <p> {vnode.attrs.threads?.length} </p>{' '}
            </div>
          </div>
          <div className="divider"></div>
          <div className="activity-nav-option">
            <h4
              onclick={(evt) => {
                handleCommunityFilterClick(evt, vnode);
              }}
            >
              All Communities
            </h4>
            <CWIcon
              iconName={
                vnode.state.isCommunitiesOpen ? 'chevronUp' : 'chevronDown'
              }
              className="chevron"
              iconSize="medium"
              onclick={(evt) => {
                handleCommunityFilterClick(evt, vnode);
              }}
            />
            {vnode.state.isCommunitiesOpen ? (
              <div className="drop-down">
                {vnode.attrs.chains.map((chain) => (
                  <div
                    className="option"
                    onclick={() => {
                      handleCommunityFilter(
                        chain.name.toLowerCase(),
                        vnode.state
                      );
                    }}
                  >
                    <p className="option-name"> {chain.name} </p>
                    {chain.name.toLowerCase() in
                    vnode.state.communityFilters ? (
                      <CWIcon
                        iconName="check"
                        iconSize="medium"
                        className="check"
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}
          </div>
          <div className="activity-nav-option">
            <h4
              onclick={(evt) => {
                handleAddressFilterClick(evt, vnode);
              }}
            >
              All Addresses
            </h4>
            <CWIcon
              iconName={
                vnode.state.isAddressesOpen ? 'chevronUp' : 'chevronDown'
              }
              className="chevron"
              iconSize="medium"
              onclick={(evt) => {
                handleAddressFilterClick(evt, vnode);
              }}
            />
            {vnode.state.isAddressesOpen ? (
              <div className="drop-down wide">
                {vnode.attrs.addresses.map((address) => (
                  <div
                    className="option"
                    onclick={() => {
                      handleAddressFilter(address.address, vnode.state);
                    }}
                  >
                    <p className="option-name">
                      {`${address.address.slice(
                        0,
                        6
                      )}...${address.address.slice(-6)}`}
                    </p>
                    {address.address in vnode.state.addressFilters ? (
                      <CWIcon
                        iconName="check"
                        iconSize="medium"
                        className="check"
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="activity-section">
          {renderActivity(
            vnode.state.selectedActivity,
            vnode.attrs,
            vnode.state
          )}
        </div>
        </CWCard>
      </div>
    );
  }
}

export default NewProfileActivity;
