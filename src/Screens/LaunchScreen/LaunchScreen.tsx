import React, {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContex';
import {SubscriptionContext} from '../../Context/SubscriptionContext';
import {Roles} from '../../Global/types';
import {isFeatureEnabled, REGISTRY} from '../../Lib/FeatureToggle';

import {CoachStack} from '../../Stacks/CoachStack';
import {PlayerStack} from '../../Stacks/PlayerStack';
import {useDeepLinks} from '../../Lib/DeepLinks/hooks/useDeepLinks';

import {PromotionalSubscription} from '../PromotionalSubscription/PromotionalSubscription';
import {RoleSelector} from '../RoleSelector/RoleSelector';

export const LAUNCH_SCREEN_KEY = 'launchScreen';
export const LaunchScreen = () => {
  useDeepLinks();
  const {user} = useContext(AuthContext);
  const {isSubscribed} = useContext(SubscriptionContext);

  if (!user?.role) {
    return <RoleSelector />;
  }

  if (user?.role === Roles.COACH || user?.role === Roles.ADMIN) {
    if (!isFeatureEnabled(REGISTRY.FEATURE_SUBSCRIPTIONS)) {
      return <CoachStack />;
    }

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
