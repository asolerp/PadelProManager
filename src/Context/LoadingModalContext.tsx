import React, {createContext, useState} from 'react';

interface LoadingModalContextInterface {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const LoadingModalContext =
  createContext<LoadingModalContextInterface | null>(null);

export const LoadingModalProvider = ({children}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [text, setText] = useState<string>('Cargando...');

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
