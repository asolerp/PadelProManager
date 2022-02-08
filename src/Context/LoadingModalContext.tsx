import React, {createContext, useState} from 'react';

export const LoadingModalContext = createContext();

export const LoadingModalProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('Cargando...');

  const value = {
    text,
    setText,
    isVisible,
    setIsVisible,
  };
  return (
    <LoadingModalContext.Provider value={value}>
      {children}
    </LoadingModalContext.Provider>
  );
};
