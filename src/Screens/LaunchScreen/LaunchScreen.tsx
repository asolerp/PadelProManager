import React, {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContex';
import {SubscriptionContext} from '../../Context/SubscriptionContext';
import {isFeatureEnabled, REGISTRY} from '../../Lib/FeatureToggle';

import {CoachStack} from '../../Stacks/CoachStack';
import {PlayerStack} from '../../Stacks/PlayerStack';

import {PromotionalSubscription} from '../PromotionalSubscription/PromotionalSubscription';
import {RoleSelector} from '../RoleSelector/RoleSelector';

export const LAUNCH_SCREEN_KEY = 'launchScreen';
export const LaunchScreen = () => {
  const {user} = useContext(AuthContext);
  const {isSubscribed} = useContext(SubscriptionContext);

  if (!user?.role) {
    return <RoleSelector />;
  }

  if (user?.role === 'coach') {
    if (!isFeatureEnabled(REGISTRY.FEATURE_SUBSCRIPTIONS)) {
      return <CoachStack />;
    }
    return <CoachStack />;

    if (isSubscribed) {
      return <CoachStack />;
    } else {
      return <PromotionalSubscription />;
    }
  }

  if (user?.role === 'player') {
    return <PlayerStack />;
  }

  return null;
};
