import 'pages/new_profile.scss';
import React from 'react';

import ProfileComponent from '../components/profile';

type NewProfileAttrs = {
  profileId: string;
};

const NewProfile = (props: NewProfileAttrs) => {
  return <ProfileComponent profileId={props.profileId} />;
};

export default NewProfile;
