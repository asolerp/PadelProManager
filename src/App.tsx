import React, {useEffect} from 'react';
import type {FunctionComponent} from 'react';

import AuthRouter from './Router/AuthRouter';
import {StatusBar} from 'react-native';
import {LoadingModalProvider} from './Context/LoadingModalContext';
import {AuthProvider} from './Context/AuthContex';
import {withIAPContext} from 'react-native-iap';
import {SubscriptionProvider} from './Context/SubscriptionContext';
import {PremiumModalProvider} from './Context/PremiumModalContext';
import Purchases from 'react-native-purchases';
import {API_KEY} from './Utils/constants';

const App: FunctionComponent = () => {
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup(API_KEY);
  }, []);

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
