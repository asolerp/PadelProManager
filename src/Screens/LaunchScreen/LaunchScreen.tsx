import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../Context/AuthContex';
import {SubscriptionContext} from '../../Context/SubscriptionContext';
import {isFeatureEnabled, REGISTRY} from '../../Lib/FeatureToggle';

import {CoachStack} from '../../Stacks/CoachStack';
import {PlayerStack} from '../../Stacks/PlayerStack';
import {LoadingPage} from '../LoadingPage/LoadingPage';
import {PromotionalSubscription} from '../PromotionalSubscription/PromotionalSubscription';
import {RoleSelector} from '../RoleSelector/RoleSelector';
import RNBootSplash from 'react-native-bootsplash';
export const LAUNCH_SCREEN_KEY = 'launchScreen';
export const LaunchScreen = () => {
  const [bootSplashVisible, setBootSplashVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const {user} = useContext(AuthContext);
  const {isSubscribed} = useContext(SubscriptionContext);

  useEffect(() => {
    const hideBootSplash = async () => {
      await RNBootSplash.hide({fade: true}).then(() =>
        setBootSplashVisible(false),
      );
    };
    hideBootSplash();
  }, []);

  // if (!loaded) {
  //   return <LoadingPage />;
  // }

  if (!user?.role) {
    return <RoleSelector />;
  }

  if (user?.role === 'coach') {
    if (isSubscribed || !isFeatureEnabled(REGISTRY.FEATURE_SUBSCRIPTIONS)) {
      return <CoachStack />;
    }
    return <PromotionalSubscription />;
  }

  return <PlayerStack />;
};
