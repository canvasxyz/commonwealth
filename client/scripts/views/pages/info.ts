import 'pages/info.scss';

import m from 'mithril';
import { Tag } from 'construct-ui';

import app from 'state';

import Sublayout from 'views/sublayout';
import { CommunityOptionsPopover } from './discussions';
import { ChainIcon, CommunityIcon } from '../components/chain_icon';
import { notifySuccess } from '../../controllers/app/notifications';

const InfoPage = {
  view: (vnode) => {
    const chain = app.chain ? app.chain.meta.chain : null;
    const community = app.community ? app.community.meta : null;
    // if not chain/community should 404 fail whale
    const isAdmin =
      app.user.isSiteAdmin ||
      app.user.isAdminOfEntity({
        chain: app.activeChainId(),
        community: app.activeCommunityId(),
      });
    const isMod = app.user.isRoleOfCommunity({
      role: 'moderator',
      chain: app.activeChainId(),
      community: app.activeCommunityId(),
    });


    /**
     * TODO: The data for this info page is going to come
     * from a variety of different chains and each chain
     * community is going to have a different subset of data
     * to be shown. Here I will detail out all the chain
     * types and the data that should be acquired for each.
     * The info page should then conditionally render the
     * various sections.
     * ---
     * Ethereum (as a base chain)
     *    --> Blocktime, total supply, # of validators, etc.
     * Ethereum Token Communities
     *    --> Total token supply, contract address, # of
     *        token holders,
     * Ethereum Compound (alpha + bravo) Governance Communities
     *    --> Token Supply, # of Proposals, contract address,
     *        # of Delegates, # of token holders, total voting
     *        addresses, voting period and delay, quorum votes,
     *        proposal threshold
     * Ethereum AAVE Governance
     *    --> Same as Compound, but use AAVE controller
     * Substrate Chains
     *    --> These are all conditionally present datapoints
     *    --> Next referenda period, # of referenda, # of
     *        proposals, # of councilors + runner ups + next
     *        election cycle start/end time, # of treasury
     *        proposals, # of bounties, # of tips, # of
     *        validators.
     * Cosmos Chains
     *    --> TODO: Fill in.
     * Cosmos DAOs:
     *    --> TODO: Fill in.
     */

    return m(Sublayout, {
      class: 'InfoPage',
      title: [
        'Info',
        m(CommunityOptionsPopover, { isAdmin, isMod }),
        m(Tag, { size: 'xs', label: 'Beta', style: 'position: relative; top: -2px; margin-left: 6px' })
      ],
      showNewProposalButton: true,
    }, [
      m('.info-contents', [
        chain ? [
          m('.flex.items-center', [
            m('.chain-image', [
              m(ChainIcon, { size: 92, chain }),
            ]),
            m('.ml-4.flex-grow', [
              m('.title', chain.name),
              m('.w-60-percent', chain.description),
            ]),
          ]),
        ] : community ? [
          m('.flex.items-center', [
            m('.chain-image', [
              m(CommunityIcon, { size: 92, community }),
            ]),
            m('.ml-4.flex-grow', [
              m('.title', community.name),
              m('.w-60-percent', community.description),
            ]),
          ]),
        ] : null,
        !app.community && [
          m('.info-box', [
            m('.info-card', [
              m('.info-metric-value', '+5k'),
              m('.info-metric-desc', 'Total Voters'),
            ]),
            m('.info-card', [
              m('.info-metric-value', '+40k'),
              m('.info-metric-desc', 'Total Holders'),
            ]),
            m('.info-card', [
              m('.info-metric-value', '181'),
              m('.info-metric-desc', 'Total Proposals'),
            ]),
            m('.info-card', [
              m('.info-metric-value', '3k'),
              m('.info-metric-desc', 'Total Posts'),
            ]),
          ]),
          m('.details-box', [
            m('.contract-details', [
              m('.title', 'Contract Addresses'),
              m('.mt-2', 'Governor'),
              m('.flex-align-center', [
                m('.callout', 'kbNWDDs5vmqLS9bYZYrF48Br7bMC6f3xg5YPRDp6ED7k7n9'),
                m('img', {
                  src: '/static/img/copy_default.svg',
                  alt: '',
                  class: 'clipboard-button',
                  onclick: (e) => {
                    window.navigator.clipboard.writeText('Rakesh')
                      .then(() => notifySuccess('Copied address to clipboard'));
                  }
                }),
              ]),
              m('.mt-6', 'Token'),
              m('.flex-align-center', [
                m('.callout', 'kbNWDDs5vmqLS9bYZYrF48Br7bMC6f3xg5YPRDp6ED7k7n9'),
                m('img', {
                  src: '/static/img/copy_default.svg',
                  alt: '',
                  class: 'clipboard-button',
                  onclick: (e) => {
                    window.navigator.clipboard.writeText('Rakesh')
                      .then(() => notifySuccess('Copied address to clipboard'));
                  }
                }),
              ]),
            ]),
            m('.voting-details', [
              m('.title', 'Voting Parameters'),
              m('.flex.space-between', [
                m('.font-500', [
                  m('.mt-20px', 'Proposal Threshold'),
                  m('.mt-20px', 'Quorom Needed'),
                  m('.mt-20px', 'Proposal Delay'),
                  m('.mt-20px', 'Voting Length'),
                ]),
                m('.mx-16px', [
                  m('.mt-20px', '65k'),
                  m('.mt-20px', '400k'),
                  m('.mt-20px', '2 days'),
                  m('.mt-20px', '3 days'),
                ]),
              ]),
            ]),
          ]),
        ],
      ])
    ]);
  }
};

export default InfoPage;
