/* @jsx m */

import m from 'mithril';
import ClassComponent from 'class_component';
import jdenticon from 'jdenticon';

import 'pages/new_profile/new_profile_header.scss';

import app from 'state';
import { navigateToSubpage } from 'app';
import { NewProfile as Profile } from 'client/scripts/models';
import { CWButton } from '../../components/component_kit/cw_button';
import { CWText } from '../../components/component_kit/cw_text';
import { renderQuillTextBody } from '../../components/quill/helpers';
import { SocialAccounts } from '../../components/social_accounts';

type NewProfileHeaderAttrs = {
  profile: Profile;
  isOwner: boolean;
};

export class NewProfileHeader extends ClassComponent<NewProfileHeaderAttrs> {
  private defaultAvatar: string;

  oninit(vnode: m.Vnode<NewProfileHeaderAttrs>) {
    this.defaultAvatar = jdenticon.toSvg(vnode.attrs.profile.id, 90);
  }

  view(vnode: m.Vnode<NewProfileHeaderAttrs>) {
    const { profile, isOwner } = vnode.attrs;

    if (!profile) return;
    const { bio, name, username } = profile;

    const isCurrentUser = app.isLoggedIn() && isOwner;

    return (
      <div class="ProfileHeader">
        <div className="edit">
          {isCurrentUser && (
            <CWButton
              label="Edit"
              buttonType="mini-white"
              iconLeft="write"
              onclick={() =>
                navigateToSubpage(`/profile/${username}/edit`)
              }
            />
          )}
        </div>
        <div class="profile-image">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} />
          ) : (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                this.defaultAvatar
              )}`}
            />
          )}
        </div>
        <div class="profile-name-and-bio">
          <CWText type="h3" className={name ? 'name hasMargin' : 'name'}>
            {name || username}
          </CWText>
          <div class="buttons">
            {/* TODO: Add delegate and follow buttons */}
            {/* <CWButton label="Delegate" buttonType="mini-black" onClick={() => {}} />
            <CWButton label="Follow" buttonType="mini-black" onClick={() => {}} /> */}
          </div>
          <SocialAccounts profile={profile} />
          {bio && (
            <div>
              <CWText type="h4">Bio</CWText>
              <CWText className="bio">{renderQuillTextBody(bio)}</CWText>
            </div>
          )}
        </div>
      </div>
    );
  }
}
