import React, {createContext, useState} from 'react';

export const NewMatchContext = createContext();

export const NewMatchProvider = ({children}) => {
  const [selectedPlayers, setSelectedPlayers] = useState({});

  const value = {
    selectedPlayers,
    setSelectedPlayers,
  };
  return (
    <NewMatchContext.Provider value={value}>
      {children}
    </NewMatchContext.Provider>
  );
};
