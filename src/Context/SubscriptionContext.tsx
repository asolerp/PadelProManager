import React, {createContext, useState} from 'react';

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
