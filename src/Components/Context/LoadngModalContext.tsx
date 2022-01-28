import React, {createContext, useState} from 'react';

export const LoadingModalContext = createContext();

export const LoadingModalProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('Cargando...');

  const value = {
    title,
    setTitle,
    isVisible,
    setIsVisible,
  };
  return (
    <LoadingModalContext.Provider value={value}>
      {children}
    </LoadingModalContext.Provider>
  );
};
