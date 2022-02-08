import React, {createContext, useState} from 'react';
import {GENERAL_LIMIT} from '../Utils/permissionsErrors';

export const PremiumModalContext = createContext();

export const PremiumModalProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messageType, setMessageType] = useState(GENERAL_LIMIT);

  const value = {
    isVisible,
    setIsVisible,
    messageType,
    setMessageType,
  };
  return (
    <PremiumModalContext.Provider value={value}>
      {children}
    </PremiumModalContext.Provider>
  );
};
