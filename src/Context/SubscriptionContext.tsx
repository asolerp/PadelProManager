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
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const value = {
    isChecking,
    setIsChecking,
    isSubscribed,
    setIsSubscribed,
  };
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
