import React, {createContext, useState} from 'react';
import {PlayerType} from '../Global/types';

export interface NewMatchContextInterface {
  selectedPlayers: PlayerType;
  setSelectedPlayers: React.Dispatch<React.SetStateAction<[PlayerType]>>;
}

export const NewMatchContext = createContext<NewMatchContextInterface | null>(
  null,
);

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
