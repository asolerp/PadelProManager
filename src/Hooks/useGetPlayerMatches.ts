import firestore from '@react-native-firebase/firestore';
import {useMemo, useState} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {useFirebaseAuth} from '../Context/FirebaseContext';

import {removeAccents} from '../Utils/removeAccents';
import {sortByClubName} from '../Utils/sorts';

export const useGetPlayerMatches = () => {
  const {user} = useFirebaseAuth();

  const [search, setSearch] = useState();
  const [searchOption, setSearchOption] = useState('name');

  const query = useMemo(
    () =>
      user?.email &&
      firestore()
        .collection('matches')
        .where('playersEmail', 'array-contains', user?.email)
        .limit(5),
    [user?.email],
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
