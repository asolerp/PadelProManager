import {useContext} from 'react';
import {useFirebaseAuth} from '../Context/FirebaseContext';

import {SubscriptionContext} from '../Context/SubscriptionContext';
import {Roles} from '../Global/types';
import {openScreenWithPush} from '../Router/utils/actions';
import {PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY} from '../Screens/PromotionalSubscription/PromotionalSubscription';

export const useCheckPermissions = () => {
  const {user} = useFirebaseAuth();

  const {isSubscribed} = useContext(SubscriptionContext);
  const handleCheckCreateNewPlayer = (playersLength, callback) => {
    if (user?.role === Roles.PLAYER || user?.role === Roles.ADMIN) {
      return callback();
    }
    if (playersLength >= 2 && !isSubscribed) {
      return openScreenWithPush(PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY);
    }
    callback();
  };

  return {
    handleCheckCreateNewPlayer,
  };
};
