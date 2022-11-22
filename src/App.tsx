import React, {useEffect} from 'react';

import Toast from 'react-native-toast-message';

import AuthRouter from './Router/AuthRouter';

import {LoadingModalProvider} from './Context/LoadingModalContext';

import {SubscriptionProvider} from './Context/SubscriptionContext';
import {PremiumModalProvider} from './Context/PremiumModalContext';
import {initRemoteConfig} from './Lib/FeatureToggle';

import {toastConfig} from './Lib/Logging/utils/toastConfig';
import '../i18n.config';
import {DynamicLinkProvider} from './Context/DynamicLinkContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import t from './Theme/theme';
import {suppressInAppMessaging} from './Lib/InAppMessaging';
import {WalkthroughProvider} from 'react-native-interactive-walkthrough';

import {FirebaseAuthProvider} from './Context/FirebaseContext';

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      await suppressInAppMessaging();
      await initRemoteConfig();
    })();
  });

  return (
    <DynamicLinkProvider>
      <FirebaseAuthProvider>
        <GestureHandlerRootView style={[t.flexGrow]}>
          <SubscriptionProvider>
            <LoadingModalProvider>
              <PremiumModalProvider>
                <WalkthroughProvider>
                  <AuthRouter />
                </WalkthroughProvider>
              </PremiumModalProvider>
            </LoadingModalProvider>
          </SubscriptionProvider>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </FirebaseAuthProvider>
    </DynamicLinkProvider>
  );
};

export default App;
