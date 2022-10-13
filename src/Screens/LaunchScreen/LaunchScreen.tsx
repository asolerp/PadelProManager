import React, {useContext} from 'react';
import {AuthContext} from '../../Context/AuthContex';

import {Roles} from '../../Global/types';

import {CoachStack} from '../../Stacks/CoachStack';
import {PlayerStack} from '../../Stacks/PlayerStack';
import {useDeepLinks} from '../../Lib/DeepLinks/hooks/useDeepLinks';

export const LAUNCH_SCREEN_KEY = 'launchScreen';
export const LaunchScreen = () => {
  useDeepLinks();
  const {user} = useContext(AuthContext);

  if (user?.role === Roles.COACH || user?.role === Roles.ADMIN) {
    return <CoachStack />;
  }

  if (user?.role === 'player') {
    return <PlayerStack />;
  }

  return null;
};
