import {useState} from 'react';
import {PlayerType} from '../../../Global/types';
import {removeAccents} from '../../../Utils/removeAccents';
import {isSameUser, onlyInLeft} from '../utils/onlyInLeft';

export const useModalList = ({selectedPlayers, list}) => {
  const [search, setSearch] = useState();
  const [player, setPlayer] = useState<PlayerType>();

  const formatedSelectedPlayers =
    selectedPlayers &&
    Object.entries(selectedPlayers)?.map(([_, value]) => value);

  const handlePressPlayer = p => {
    if (p.id === player?.id) {
      return setPlayer(null);
    }
    return setPlayer(p);
  };

  const getFormatedName = p =>
    removeAccents(`${p.firstName} ${p.secondName}`).toLowerCase();

  const formatedSearch = search && removeAccents(search).toLowerCase();

  const playersList = !formatedSelectedPlayers
    ? list
    : onlyInLeft(list, formatedSelectedPlayers, isSameUser);

  const filteredList = !search
    ? playersList
    : playersList?.filter(p => getFormatedName(p).includes(formatedSearch));

  return {
    search,
    player,
    setPlayer,
    setSearch,
    filteredList,
    handlePressPlayer,
  };
};
