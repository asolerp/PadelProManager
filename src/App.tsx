import React, {useEffect} from 'react';

import Toast from 'react-native-toast-message';

import AuthRouter from './Router/AuthRouter';
import {StatusBar} from 'react-native';
import {LoadingModalProvider} from './Context/LoadingModalContext';
import {AuthProvider} from './Context/AuthContex';

import {SubscriptionProvider} from './Context/SubscriptionContext';
import {PremiumModalProvider} from './Context/PremiumModalContext';
import {initRemoteConfig} from './Lib/FeatureToggle';

import {toastConfig} from './Lib/Logging/utils/toastConfig';

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      await initRemoteConfig();
    })();
  });

  return (
    <React.Fragment>
      <StatusBar animated={true} barStyle="dark-content" />
      <AuthProvider>
        <SubscriptionProvider>
          <LoadingModalProvider>
            <PremiumModalProvider>
              <AuthRouter />
            </PremiumModalProvider>
          </LoadingModalProvider>
        </SubscriptionProvider>
      </AuthProvider>
      <Toast config={toastConfig} />
    </React.Fragment>
  );
};

export default App;
