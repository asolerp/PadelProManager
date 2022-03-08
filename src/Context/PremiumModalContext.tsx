import React, {createContext, useState} from 'react';
import {GENERAL_LIMIT} from '../Utils/permissionsErrors';

interface PremiumModalContextInterface {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  messageType: string;
  setMessageType: React.Dispatch<React.SetStateAction<string>>;
}

export const PremiumModalContext =
  createContext<PremiumModalContextInterface | null>(null);

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
