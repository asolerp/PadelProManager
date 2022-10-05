import {useContext} from 'react';
import {SubscriptionContext} from '../Context/SubscriptionContext';
import {openScreenWithPush} from '../Router/utils/actions';
import {PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY} from '../Screens/PromotionalSubscription/PromotionalSubscription';

export const useCheckPermissions = () => {
  const {isSubscribed} = useContext(SubscriptionContext);
  const handleCheckCreateNewPlayer = (playersLength, callback) => {
    if (playersLength >= 2 && !isSubscribed) {
      return openScreenWithPush(PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY);
    }
    callback();
  };

  return {
    handleCheckCreateNewPlayer,
  };
};
