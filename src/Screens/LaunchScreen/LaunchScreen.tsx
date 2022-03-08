import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../Context/AuthContex';
import {SubscriptionContext} from '../../Context/SubscriptionContext';

import {CoachStack} from '../../Stacks/CoachStack';
import {PlayerStack} from '../../Stacks/PlayerStack';

import {LoadingPage} from '../LoadingPage/LoadingPage';
import {PromotionalSubscription} from '../PromotionalSubscription/PromotionalSubscription';
import {RoleSelector} from '../RoleSelector/RoleSelector';

export const LAUNCH_SCREEN_KEY = 'launchScreen';
export const LaunchScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const {user} = useContext(AuthContext);
  const {isSubscribed} = useContext(SubscriptionContext);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  if (!loaded) {
    return <LoadingPage />;
  }

  if (!user?.role) {
    return <RoleSelector />;
  }

  if (user?.role === 'coach') {
    if (isSubscribed) {
      return <CoachStack />;
    }
    return <PromotionalSubscription />;
  }

  return <PlayerStack />;
};
