import React, {createContext, useContext, useState} from 'react';
import {AuthContext} from './AuthContex';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({children}) => {
  const {user} = useContext(AuthContext);
  const [isChecking, setIsChecking] = useState(true);

  const isUserWithActiveSubscription = user?.status?.isSubscribed;

  const value = {
    isChecking,
    setIsChecking,
    isUserWithActiveSubscription,
  };
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
