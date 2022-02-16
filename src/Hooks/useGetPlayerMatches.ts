import firestore from '@react-native-firebase/firestore';
import {useMemo, useState} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {useGetPlayerByUserId} from '../Hooks/useGetPlayerByUserId';
import {removeAccents} from '../Utils/removeAccents';
import {sortByClubName} from '../Utils/sorts';

export const useGetPlayerMatches = () => {
  const {player} = useGetPlayerByUserId();
  const [search, setSearch] = useState();
  const [searchOption, setSearchOption] = useState('name');

  const query = useMemo(
    () =>
      player?.id &&
      firestore()
        .collection('matches')
        .where('playersId', 'array-contains', player?.id)
        .limit(5),
    [player?.id],
  );

  const [matches, loading, error] = useCollectionData(query, {
    idField: 'id',
  });

  const getFormatedClubName = p => removeAccents(`${p.club}`).toLowerCase();
  const getFormatedName = (p, team, pos) =>
    removeAccents(
      `${p?.[`t${team}`]?.[pos]?.firstName} ${
        p?.[`t${team}`]?.[pos]?.secondName
      }`,
    ).toLowerCase();

  const formatedSearch = search && removeAccents(search).toLowerCase();

  const filteredList = {
    club: !search
      ? matches?.sort(sortByClubName)
      : matches
          ?.sort(sortByClubName)
          ?.filter(p => getFormatedClubName(p).includes(formatedSearch)),
    name: !search
      ? matches?.sort(sortByClubName)
      : matches
          ?.sort(sortByClubName)
          ?.filter(
            p =>
              getFormatedName(p, 1, 0).includes(formatedSearch) ||
              getFormatedName(p, 1, 1).includes(formatedSearch) ||
              getFormatedName(p, 2, 0).includes(formatedSearch) ||
              getFormatedName(p, 2, 1).includes(formatedSearch),
          ),
  };

  return {
    matches: filteredList?.[searchOption],
    loadingMatches: loading,
    errorMatches: error,
    setSearchOption,
    searchOption,
    filteredList,
    setSearch,
    search,
  };
};
