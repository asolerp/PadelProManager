import {useEffect, useState} from 'react';
import {PlayerType} from '../../../Global/types';
import {removeAccents} from '../../../Utils/removeAccents';
import {sortByName} from '../../../Utils/sorts';
import {isSameUser, onlyInLeft} from '../utils/onlyInLeft';

export const useModalList = ({
  selectedPlayers,
  initSelection,
  list,
  multiple,
}) => {
  const [search, setSearch] = useState();
  const [player, setPlayer] = useState<PlayerType>();
  const [players, setPlayers] = useState<PlayerType[]>([]);

  const formatedSelectedPlayers =
    selectedPlayers &&
    Object.entries(selectedPlayers)?.map(([_, value]) => value);

  const handlePressPlayer = p => {
    if (multiple) {
      if (p) {
        if (players.find(pl => pl.id === p.id)) {
          return setPlayers(players.filter(pl => pl.id !== p.id));
        }
        return setPlayers(old => old.concat(p));
      }
    } else {
      if (p) {
        if (p?.id === player?.id) {
          return setPlayer(null);
        }
        return setPlayer(p);
      }
    }
  };

  const getFormatedName = p =>
    removeAccents(`${p?.firstName} ${p?.secondName}`).toLowerCase();

  const formatedSearch = search && removeAccents(search).toLowerCase();

  const playersList = !formatedSelectedPlayers
    ? list
    : onlyInLeft(list, formatedSelectedPlayers, isSameUser);

  const filteredList = !search
    ? playersList?.sort(sortByName)
    : playersList
        ?.sort(sortByName)
        ?.filter(p => getFormatedName(p).includes(formatedSearch));

  useEffect(() => {
    if (initSelection) {
      setPlayers(initSelection);
    }
  }, [initSelection]);

  return {
    search,
    player,
    players,
    setPlayer,
    setSearch,
    filteredList,
    handlePressPlayer,
  };
};
