import React from 'react';
import type {FunctionComponent} from 'react';

import AuthRouter from './Router/AuthRouter';
import {StatusBar} from 'react-native';
import {LoadingModalProvider} from './Context/LoadngModalContext';
import {AuthProvider} from './Context/AuthContex';
import {withIAPContext} from 'react-native-iap';
import {SubscriptionProvider} from './Context/SubscriptionContext';

const App: FunctionComponent = () => {
  return (
    <>
      <StatusBar animated={true} barStyle="dark-content" />
      <AuthProvider>
        <LoadingModalProvider>
          <SubscriptionProvider>
            <AuthRouter />
          </SubscriptionProvider>
        </LoadingModalProvider>
      </AuthProvider>
    </>
  );
};

export default withIAPContext(App);
