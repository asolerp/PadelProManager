import React, {createContext, useState} from 'react';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({children}) => {
  const [isExpired, setIsExpired] = useState(true);
  const [oldPurchases, setOldPurchases] = useState();
  const [isChecking, setIsChecking] = useState();

  const isUserWithActiveSubscription = oldPurchases && !isExpired;

  const value = {
    isExpired,
    setIsExpired,
    isChecking,
    setIsChecking,
    oldPurchases,
    setOldPurchases,
    isUserWithActiveSubscription,
  };
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
