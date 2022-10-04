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
import '../i18n.config';
import {DynamicLinkProvider} from './Context/DynamicLinkContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import t from './Theme/theme';

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      await initRemoteConfig();
    })();
  });

  return (
    <GestureHandlerRootView style={[t.flexGrow]}>
      <StatusBar animated={true} barStyle="dark-content" />
      <AuthProvider>
        <DynamicLinkProvider>
          <SubscriptionProvider>
            <LoadingModalProvider>
              <PremiumModalProvider>
                <AuthRouter />
              </PremiumModalProvider>
            </LoadingModalProvider>
          </SubscriptionProvider>
        </DynamicLinkProvider>
      </AuthProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
};

export default App;
