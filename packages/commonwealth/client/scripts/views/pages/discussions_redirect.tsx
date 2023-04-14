import { useCommonNavigate } from 'navigation/helpers';
import React, { useEffect } from 'react';

import app from 'state';
import { DefaultPage } from '../../../../../common-common/src/types';
import { PageLoading } from './loading';

export default function DiscussionsRedirect() {
  const navigate = useCommonNavigate();

  useEffect(() => {
    if (!app.chain) return;

    const { defaultPage, defaultOverview, hasHomepage } = app.chain.meta;
    let view;

    if (hasHomepage) {
      view = defaultPage;
    } else {
      view = defaultOverview ? DefaultPage.Overview : DefaultPage.Discussions;
    }

    // @TODO: make sure that this navigation does not apply to back button
    switch (view) {
      case DefaultPage.Overview:
        navigate('/overview');
        break;
      case DefaultPage.Discussions:
        navigate('/discussions');
        break;
      case DefaultPage.Homepage:
        navigate('/feed');
        break;
      default:
        navigate('/discussions');
    }
  }, [navigate]);

  return <PageLoading />;
}
