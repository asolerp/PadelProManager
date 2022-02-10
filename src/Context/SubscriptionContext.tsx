import React, {createContext, useContext, useState} from 'react';
import {AuthContext} from './AuthContex';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({children}) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  console.log(isSubscribed, 'isSubscribed');

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
