import React, {useEffect} from 'react';
import type {FunctionComponent} from 'react';

import AuthRouter from './Router/AuthRouter';
import {StatusBar} from 'react-native';
import {LoadingModalProvider} from './Context/LoadingModalContext';
import {AuthProvider} from './Context/AuthContex';
import {withIAPContext} from 'react-native-iap';

import {SubscriptionProvider} from './Context/SubscriptionContext';
import {PremiumModalProvider} from './Context/PremiumModalContext';
import {initRemoteConfig} from './Lib/FeatureToggle';

const App: FunctionComponent = () => {
  useEffect(() => {
    (async () => {
      await initRemoteConfig();
    })();
  });

  return (
    <>
      <StatusBar animated={true} barStyle="dark-content" />
      <AuthProvider>
        <LoadingModalProvider>
          <PremiumModalProvider>
            <SubscriptionProvider>
              <AuthRouter />
            </SubscriptionProvider>
          </PremiumModalProvider>
        </LoadingModalProvider>
      </AuthProvider>
    </>
  );
};

export default withIAPContext(App);
