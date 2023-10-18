import React from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

import { CWTag } from 'views/components/component_kit/new_designs/CWTag';
import { SubSectionGroup } from '../sidebar_section';
import { useCommonNavigate } from 'navigation/helpers';

import './DirectoryMenuItem.scss';

const DirectoryMenuItem = () => {
  const navigate = useCommonNavigate();
  const location = useLocation();

  // TODO change from manage to /directory
  const matchesDirectoryRoute = matchRoutes(
    [{ path: '/manage' }, { path: ':scope/manage' }],
    location
  );

  return (
    <SubSectionGroup
      // TODO show it depending on toggle value in manage community
      isVisible={true}
      isActive={!!matchesDirectoryRoute}
      className="DirectoryMenuItem"
      title="Directory"
      containsChildren={false}
      displayData={[]}
      hasDefaultToggle={false}
      // TODO change to /directory
      onClick={() => navigate('/manage')}
      rightIcon={<CWTag label="New" type="new" iconName="newStar" />}
    />
  );
};

export default DirectoryMenuItem;
