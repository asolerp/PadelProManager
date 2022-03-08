import React, {createContext, useEffect, useState} from 'react';
import {openScreenWithPush} from '../Router/utils/actions';
import {PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY} from '../Screens/PromotionalSubscription/PromotionalSubscription';

interface SubscriptionContextInterface {
  isChecking: boolean;
  isSubscribed: boolean;
  setIsChecking: React.Dispatch<boolean>;
  setIsSubscribed: React.Dispatch<boolean>;
}

export const SubscriptionContext =
  createContext<SubscriptionContextInterface | null>(null);

export const SubscriptionProvider = ({children}) => {
  const [subscriptions, setSubscriptions] = useState();
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>();

  // useEffect(() => {
  //   if (isSubscribed === false) {
  //     openScreenWithPush(PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY);
  //   }
  // }, [isSubscribed]);

  const value = {
    isChecking,
    setIsChecking,
    isSubscribed,
    setIsSubscribed,
    subscriptions,
    setSubscriptions,
  };
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
