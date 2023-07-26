import { NotificationCategories } from 'common-common/src/types';
import useForceRerender from 'hooks/useForceRerender';
import moment from 'moment';
import { useCommonNavigate } from 'navigation/helpers';
import 'pages/notification_settings/index.scss';
import React, { useEffect, useState } from 'react';
import app from 'state';
import AddressInfo from '../../../models/AddressInfo';
import NotificationSubscription from '../../../models/NotificationSubscription';
import { CWIcon } from '../../components/component_kit/cw_icons/cw_icon';
import { CWButton } from '../../components/component_kit/cw_button';
import { CWCard } from '../../components/component_kit/cw_card';
import { CWCheckbox } from '../../components/component_kit/cw_checkbox';
import { CWCollapsible } from '../../components/component_kit/cw_collapsible';
import { CWCommunityAvatar } from '../../components/component_kit/cw_community_avatar';
import { PopoverMenu } from '../../components/component_kit/cw_popover/cw_popover_menu';
import { CWText } from '../../components/component_kit/cw_text';
import { CWTextInput } from '../../components/component_kit/cw_text_input';
import { CWToggle } from '../../components/component_kit/cw_toggle';
import { isWindowExtraSmall } from '../../components/component_kit/helpers';
import { User } from '../../components/user/user';
import { PageLoading } from '../loading';
import { bundleSubs } from './helpers';
import {
  SubscriptionRowMenu,
  SubscriptionRowTextContainer,
} from './helper_components';
import { DeliveryMechanismType } from '../../../../../shared/types';
import {
  FirebaseMessaging,
  GetTokenOptions,
} from '@capacitor-firebase/messaging';

const emailIntervalFrequencyMap = {
  never: 'Never',
  weekly: 'Once a week',
  daily: 'Everyday',
  twoweeks: 'Every two weeks',
  monthly: 'Once a month',
};

const NotificationSettingsPage = () => {
  const navigate = useCommonNavigate();
  const forceRerender = useForceRerender();
  const [email, setEmail] = useState('');
  const [emailValidated, setEmailValidated] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [token, setToken] = useState('');

  const [currentFrequency, setCurrentFrequency] = useState(
    app.user.emailInterval
  );

  useEffect(() => {
    app.user.notifications.isLoaded.once('redraw', forceRerender);
  }, [app?.user.notifications, app.user.emailInterval]);

  // useEffect(() => {
  //   const messaging = FirebaseMessaging.messaging();

  //   messaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //     // Customize notification here
  //     const notificationTitle = payload.notification.title;
  //     const notificationOptions = {
  //       body: payload.notification.body,
  //       icon: payload.notification.icon
  //     };

  //     if (!("Notification" in window)) {
  //       console.log("This browser does not support system notifications");
  //     } else if (Notification.permission === "granted") {
  //       // If it's okay let's create a notification
  //       new Notification(notificationTitle, notificationOptions);
  //     }
  //   });
  // }, []);

  // Handler for the 'Request Permission' button
  const requestPermission = async () => {
    const permission = await FirebaseMessaging.requestPermissions();
    return permission;
  };

  // Handler for the 'Get Token' button
  const getToken = async () => {
    const vapidKey =
      'BDMNzw-2Dm1HcE9hFr3T4Li_pCp_w7L4tCcq-OETD71J1DdC0VgIogt6rC8Hh0bHtTacyZHSoQ1ax5KCU4ZjS30';

    let _token;
    await FirebaseMessaging.getToken({ vapidKey: vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Current token:', currentToken);
          setToken(currentToken.token);
          _token = currentToken.token;
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    return _token;
  };

  const handleToggleDeliveryMechanism = async (mechanismType, isEnabled) => {
    const mechanism = app.user.notifications.deliveryMechanisms.find(
      (m) => m.type === mechanismType
    );

    const platform = app.platform();

    const isOnRightPlatform =
      (mechanismType === DeliveryMechanismType.Ios && platform === 'ios') ||
      (mechanismType === DeliveryMechanismType.Android &&
        platform === 'android') ||
      (mechanismType === DeliveryMechanismType.Browser && platform === 'web') ||
      (mechanismType === DeliveryMechanismType.Desktop && platform === 'web');

    if (
      isOnRightPlatform &&
      (await requestPermission()).receive === 'granted'
    ) {
      if (!mechanism && isEnabled) {
        const _token = await getToken();
        await app.user.notifications.addDeliveryMechanism(
          _token,
          mechanismType,
          true
        );
      } else if (mechanism && isEnabled) {
        const _token = await getToken();
        await app.user.notifications.updateDeliveryMechanism(
          _token,
          mechanismType,
          true
        );
      } else if (mechanism && !isEnabled) {
        // If the user wants to disable the delivery mechanism and it exists, we disable it
        await app.user.notifications.disableMechanism(mechanismType);
      }
      forceRerender();
    }
  };

  const handleSubscriptions = async (
    hasSomeInAppSubs: boolean,
    subs: NotificationSubscription[]
  ) => {
    if (hasSomeInAppSubs) {
      await app.user.notifications.disableSubscriptions(subs);
    } else {
      await app.user.notifications.enableSubscriptions(subs);
    }
    forceRerender();
  };

  const handleEmailSubscriptions = async (
    hasSomeEmailSubs: boolean,
    subs: NotificationSubscription[]
  ) => {
    if (hasSomeEmailSubs) {
      await app.user.notifications.disableImmediateEmails(subs);
    } else {
      await app.user.notifications.enableImmediateEmails(subs);
    }
    forceRerender();
  };

  const handleUnsubscribe = async (subscription: NotificationSubscription) => {
    await app.user.notifications.deleteSubscription(subscription);
    forceRerender();
  };

  if (!app.loginStatusLoaded()) {
    return <PageLoading />;
  } else if (!app.isLoggedIn()) {
    navigate('/', { replace: true });
    return <PageLoading />;
  }

  // bundled discussion subscriptions
  const bundledSubs = bundleSubs(
    app?.user.notifications.subscriptions.filter(
      (x) => x.category !== 'chain-event'
    )
  );
  // bundled chain-event subscriptions
  const chainEventSubs = bundleSubs(
    app?.user.notifications.subscriptions.filter(
      (x) => x.category === 'chain-event'
    )
  );

  const subscribedChainIds =
    app?.user.notifications.chainEventSubscribedChainIds;

  // chains/communities the user has addresses for but does not have existing subscriptions for
  const relevantSubscribedChains = app?.user.addresses
    .map((x) => x.chain)
    .filter((x) => subscribedChainIds.includes(x.id) && !chainEventSubs[x.id]);

  const deliveryMechanismTypes = Object.values(DeliveryMechanismType);

  return (
    <div className="NotificationSettingsPage">
      <CWText type="h3" fontWeight="semiBold" className="page-header-text">
        Notification Management
      </CWText>
      <CWText className="page-subheader-text">
        Notification settings for all new threads, comments, mentions, likes,
        and chain events in the following communities.
      </CWText>
      <div className="email-management-section">
        <div className="text-description">
          <CWText type="h5">Scheduled Email Digest</CWText>
          <CWText type="b2" className="subtitle-text">
            Bundle top posts from all your communities via email as often as you
            need it.
          </CWText>
        </div>
        {app.user.emailVerified ? (
          <PopoverMenu
            renderTrigger={(onclick) => (
              <CWButton
                buttonType="mini-white"
                label={emailIntervalFrequencyMap[currentFrequency]}
                iconRight="chevronDown"
                onClick={onclick}
              />
            )}
            menuItems={[
              {
                label: 'Once a week',
                onClick: () => {
                  app.user.updateEmailInterval('weekly');
                  setCurrentFrequency('weekly');
                  forceRerender();
                },
              },
              {
                label: 'Never',
                onClick: () => {
                  app.user.updateEmailInterval('never');
                  setCurrentFrequency('never');
                  forceRerender();
                },
              },
            ]}
          />
        ) : (
          <CWText className="alert-text">
            Verify Email to set Digest Interval
          </CWText>
        )}
      </div>
      {(!app.user.email || !app.user.emailVerified) && (
        <div className="email-input-section">
          <CWCard fullWidth className="email-card">
            {sentEmail ? (
              <div className="loading-state">
                <CWText>
                  Check your email to verify the your account. Refresh this page
                  when finished connecting.
                </CWText>
              </div>
            ) : (
              <>
                <CWText type="h5">Email Request</CWText>
                <CWText type="b1">
                  Mmm...seems like we don't have your email on file? Enter your
                  email below so we can send you scheduled email digests.
                </CWText>
                <div className="email-input-row">
                  <CWTextInput
                    placeholder="Enter Email"
                    containerClassName="email-input"
                    inputValidationFn={(value) => {
                      const validEmailRegex = /\S+@\S+\.\S+/;

                      if (!validEmailRegex.test(value)) {
                        setEmailValidated(false);
                        return [
                          'failure',
                          'Please enter a valid email address',
                        ];
                      } else {
                        setEmailValidated(true);
                        return [];
                      }
                    }}
                    onInput={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <CWButton
                    label="Save"
                    buttonType="primary-black"
                    disabled={!emailValidated}
                    onClick={() => {
                      try {
                        app.user.updateEmail(email);
                        setSentEmail(true);
                        // forceRerender();
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  />
                </div>
              </>
            )}
          </CWCard>
        </div>
      )}
      <CWText className="page-subheader-text">
        Configure which platforms you want to receive notifications to. After
        you configure them you can directly manage which subscriptions go to
        which platforms.
      </CWText>
      <div className="column-header-row">
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="column-header-text"
        >
          Platform
        </CWText>
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="last-column-header-text"
        >
          Toggle
        </CWText>
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="last-column-header-text"
        >
          Device Allowed
        </CWText>
      </div>
      {deliveryMechanismTypes.map((mechanismType) => {
        const mechanism = app?.user.notifications.deliveryMechanisms.find(
          (m) => m.type === mechanismType
        );
        const platform = app.platform();
        const isOnPlatform =
          (mechanismType === DeliveryMechanismType.Ios && platform === 'ios') ||
          (mechanismType === DeliveryMechanismType.Android &&
            platform === 'android') ||
          (mechanismType === DeliveryMechanismType.Browser &&
            platform === 'web') ||
          (mechanismType === DeliveryMechanismType.Desktop &&
            platform === 'web');

        return (
          <div
            key={mechanismType}
            className="notification-row chain-events-subscriptions-padding"
          >
            <div className="notification-row-header">
              <div className="left-content-container">
                <div className="avatar-and-name">
                  <CWIcon name={mechanismType} iconName={'home'} />
                  <CWText type="h5" fontWeight="medium">
                    {mechanismType.charAt(0).toUpperCase() +
                      mechanismType.slice(1)}
                  </CWText>
                </div>
              </div>
              <CWToggle
                checked={mechanism?.enabled || false}
                disabled={!isOnPlatform}
                onChange={() => {
                  if (isOnPlatform) {
                    const newEnabledState = mechanism
                      ? !mechanism.enabled
                      : true;
                    handleToggleDeliveryMechanism(
                      mechanismType,
                      newEnabledState
                    );
                  }
                }}
              />
              {!isOnPlatform && (
                <div className="platform-warning">
                  <CWText
                    isCentered={true}
                    type="caption"
                    className="platform-warning-text"
                  >
                    Should be on device toggle delivery on.
                  </CWText>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <CWText
        type="h4"
        fontWeight="semiBold"
        className="chain-events-section-margin"
      >
        Chain Events
      </CWText>
      <div className="column-header-row">
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="column-header-text"
        >
          Community
        </CWText>
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="column-header-text"
        >
          Email
        </CWText>
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="last-column-header-text"
        >
          In-App
        </CWText>
      </div>
      {relevantSubscribedChains
        .sort((x, y) => x.name.localeCompare(y.name))
        .map((chain) => {
          return (
            <div
              className="notification-row chain-events-subscriptions-padding"
              key={chain.id}
            >
              <div className="notification-row-header">
                <div className="left-content-container">
                  <div className="avatar-and-name">
                    <CWCommunityAvatar size="medium" community={chain} />
                    <CWText type="h5" fontWeight="medium">
                      {chain.name}
                    </CWText>
                  </div>
                </div>
                <CWCheckbox
                  label="Receive Emails"
                  disabled={true}
                  checked={false}
                  onChange={() => {
                    handleEmailSubscriptions(false, []);
                  }}
                />
                <CWToggle
                  checked={false}
                  onChange={() => {
                    app.user.notifications
                      .subscribe(NotificationCategories.ChainEvent, chain.id)
                      .then(() => {
                        forceRerender();
                      });
                  }}
                />
              </div>
            </div>
          );
        })}

      {Object.entries(chainEventSubs)
        .sort((x, y) => x[0].localeCompare(y[0]))
        .map(([chainName, subs]) => {
          const chainInfo = app.config.chains.getById(chainName);
          const hasSomeEmailSubs = subs.some((s) => s.immediateEmail);
          const hasSomeInAppSubs = subs.some((s) => s.isActive);
          return (
            <div
              className="notification-row chain-events-subscriptions-padding"
              key={chainName}
            >
              <div className="notification-row-header">
                <div className="left-content-container">
                  <div className="avatar-and-name">
                    <CWCommunityAvatar size="medium" community={chainInfo} />
                    <CWText type="h5" fontWeight="medium">
                      {chainInfo?.name}
                    </CWText>
                  </div>
                </div>
                <CWCheckbox
                  label="Receive Emails"
                  checked={hasSomeEmailSubs}
                  onChange={() => {
                    handleEmailSubscriptions(hasSomeEmailSubs, subs);
                  }}
                />
                <CWToggle
                  checked={hasSomeInAppSubs}
                  onChange={() => {
                    handleSubscriptions(hasSomeInAppSubs, subs);
                  }}
                />
              </div>
            </div>
          );
        })}
      <CWText
        type="h4"
        fontWeight="semiBold"
        className="discussion-section-margin"
      >
        Discussion
      </CWText>
      <div className="column-header-row">
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="column-header-text"
        >
          Community
        </CWText>
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="column-header-text"
        >
          Email
        </CWText>
        <CWText
          type={isWindowExtraSmall(window.innerWidth) ? 'caption' : 'h5'}
          fontWeight="medium"
          className="last-column-header-text"
        >
          In-App
        </CWText>
      </div>
      {Object.entries(bundledSubs)
        .sort((x, y) => x[0].localeCompare(y[0]))
        .map(([chainName, subs]) => {
          const chainInfo = app?.config.chains.getById(chainName);
          const hasSomeEmailSubs = subs.some((s) => s.immediateEmail);
          const hasSomeInAppSubs = subs.some((s) => s.isActive);

          if (!chainInfo?.id) return null; // handles incomplete loading case

          return (
            <div key={chainInfo?.id} className="notification-row">
              <CWCollapsible
                headerContent={
                  <div className="notification-row-header">
                    <div className="left-content-container">
                      <div className="avatar-and-name">
                        <CWCommunityAvatar
                          size="medium"
                          community={chainInfo}
                        />
                        <CWText type="h5" fontWeight="medium">
                          {chainInfo?.name}
                        </CWText>
                      </div>
                      <CWText type="b2" className="subscriptions-count-text">
                        {subs.length} subscriptions
                      </CWText>
                    </div>
                    <CWCheckbox
                      label="Receive Emails"
                      checked={hasSomeEmailSubs}
                      onChange={() =>
                        handleEmailSubscriptions(hasSomeEmailSubs, subs)
                      }
                    />
                    <CWToggle
                      checked={hasSomeInAppSubs}
                      onChange={() =>
                        handleSubscriptions(hasSomeInAppSubs, subs)
                      }
                    />
                  </div>
                }
                collapsibleContent={
                  <div className="subscriptions-list-container">
                    <div className="subscriptions-list-header">
                      <CWText
                        type="caption"
                        className="subscription-list-header-text"
                      >
                        Title
                      </CWText>
                      <CWText
                        type="caption"
                        className="subscription-list-header-text"
                      >
                        Subscribed
                      </CWText>
                      <CWText
                        type="caption"
                        className="subscription-list-header-text"
                      >
                        Author
                      </CWText>
                    </div>
                    {subs.map((sub) => {
                      const getUser = () => {
                        if (sub.Thread?.chain) {
                          return (
                            <User
                              user={
                                new AddressInfo(
                                  null,
                                  sub.Thread.author,
                                  sub.Thread.chain,
                                  null
                                )
                              }
                            />
                          );
                        } else if (sub.Comment?.chain) {
                          return (
                            <User
                              user={
                                new AddressInfo(
                                  null,
                                  sub.Comment.author,
                                  sub.Comment.chain,
                                  null
                                )
                              }
                            />
                          );
                        } else {
                          // return empty div to ensure that grid layout is correct
                          // even in the absence of a user
                          return <div key={sub.id} />;
                        }
                      };

                      const getTimeStamp = () => {
                        if (sub.Thread) {
                          return moment(sub.Thread.createdAt).format('l');
                        } else if (sub.Comment) {
                          return moment(sub.Comment.createdAt).format('l');
                        } else {
                          return null;
                        }
                      };

                      return (
                        <div key={sub.id}>
                          <div className="subscription-row-desktop">
                            <SubscriptionRowTextContainer subscription={sub} />
                            <CWText type="b2">{getTimeStamp()}</CWText>
                            {getUser()}
                            <SubscriptionRowMenu
                              subscription={sub}
                              onUnsubscribe={handleUnsubscribe}
                            />
                          </div>
                          <div className="subscription-row-mobile">
                            <div className="subscription-row-mobile-top">
                              <SubscriptionRowTextContainer
                                subscription={sub}
                              />
                              <SubscriptionRowMenu
                                subscription={sub}
                                onUnsubscribe={handleUnsubscribe}
                              />
                            </div>
                            <div className="subscription-row-mobile-bottom">
                              {getUser()}
                              {getTimeStamp() && (
                                <CWText
                                  type="caption"
                                  className="subscription-list-header-text"
                                >
                                  subscribed
                                </CWText>
                              )}
                              <CWText
                                type="caption"
                                fontWeight="medium"
                                className="subscription-list-header-text"
                              >
                                {getTimeStamp()}
                              </CWText>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                }
              />
            </div>
          );
        })}
    </div>
  );
};

export default NotificationSettingsPage;
