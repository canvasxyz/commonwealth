import 'components/sidebar/sidebar_quick_switcher.scss';

import { link } from 'helpers';
import useUserLoggedIn from 'hooks/useUserLoggedIn';
import { useCommonNavigate } from 'navigation/helpers';
import React from 'react';

import app from 'state';
import ChainInfo from '../../../models/ChainInfo';
import { CWCommunityAvatar } from '../component_kit/cw_community_avatar';
import { CWDivider } from '../component_kit/cw_divider';
import { CWIconButton } from '../component_kit/cw_icon_button';

export const SidebarQuickSwitcher = () => {
  const navigate = useCommonNavigate();
  const { isLoggedIn } = useUserLoggedIn();

  const allCommunities = app.config.chains
    .getAll()
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      (item) => !!item.node // only chains with nodes
    );

  const starredCommunities = allCommunities.filter((item) => {
    // filter out non-starred communities
    return !(item instanceof ChainInfo && !app.communities.isStarred(item.id));
  });

  return (
    <div className="SidebarQuickSwitcher">
      <div className="community-nav-bar">
        {isLoggedIn && (
          <CWIconButton
            iconName="plusCircle"
            iconButtonTheme="black"
            onClick={() => {
              app.sidebarMenu = 'createContent';
              app.sidebarRedraw.emit('redraw');
            }}
          />
        )}
        <CWIconButton
          iconName="compass"
          iconButtonTheme="black"
          onClick={() => {
            app.sidebarMenu = 'exploreCommunities';
            app.sidebarRedraw.emit('redraw');
          }}
        />
      </div>
      <CWDivider />
      <div className="scrollable-community-bar">
        {starredCommunities.map((item) => (
          <CWCommunityAvatar
            key={item.id}
            size="large"
            community={item}
            onClick={link ? () => navigate(`/${item.id}`, {}, null) : undefined}
          />
        ))}
      </div>
    </div>
  );
};
