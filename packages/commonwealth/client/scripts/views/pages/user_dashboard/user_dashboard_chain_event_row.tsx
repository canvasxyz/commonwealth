import 'pages/user_dashboard/user_dashboard_chain_event_row.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import type { IEventLabel } from '../../../../../../chain-events/src';
import ChainInfo from '../../../models/ChainInfo';
import { CWCommunityAvatar } from '../../components/component_kit/cw_community_avatar';
import { CWIcon } from '../../components/component_kit/cw_icons/cw_icon';
import type { IconName } from '../../components/component_kit/cw_icons/cw_icon_lookup';
import { CWText } from '../../components/component_kit/cw_text';
import { getClasses } from '../../components/component_kit/helpers';

type UserDashboardChainEventRowProps = {
  blockNumber: number;
  chain: ChainInfo;
  label: IEventLabel;
};

export const UserDashboardChainEventRow = (
  props: UserDashboardChainEventRowProps
) => {
  const { blockNumber, chain, label } = props;

  return (
    <Link
      className={getClasses<{ isLink?: boolean }>(
        { isLink: !!label.linkUrl },
        'UserDashboardChainEventRow'
      )}
      {...(label.linkUrl && { to: label.linkUrl })}
    >
      <div className="chain-event-icon-container">
        <CWIcon
          iconName={label.icon ? (label.icon as IconName) : 'element'}
          className={label.icon === 'delegate' ? 'delegate' : ''}
        />
      </div>
      <div className="chain-event-text-container">
        <div className="community-title">
          <CWCommunityAvatar community={chain} size="small" />
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...(chain?.id && { to: `/${chain?.id}` })}
          >
            <CWText type="caption" fontWeight="medium">
              {chain?.name || 'Unknown chain'}
            </CWText>
          </Link>
          <div className="dot">.</div>
          <CWText type="caption" fontWeight="medium" className="block">
            Block {blockNumber}
          </CWText>
        </div>
        <CWText className="row-top-text" fontWeight="bold">
          {label.heading}
        </CWText>
        <CWText type="caption" className="label">
          {label.label}
        </CWText>
      </div>
    </Link>
  );
};