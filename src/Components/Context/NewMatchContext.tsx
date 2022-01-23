import React, {createContext, useState} from 'react';

export const NewMatchContext = createContext();

export const NewMatchProvider = ({children}) => {
  const [hola] = useState('hola');
  const [selectedPlayers, setSelectedPlayers] = useState();

  const value = {
    hola,
    selectedPlayers,
    setSelectedPlayers,
  };
  return (
    <NewMatchContext.Provider value={value}>
      {children}
    </NewMatchContext.Provider>
  );
};
