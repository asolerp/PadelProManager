import {useMemo, useState} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {removeAccents} from '../Utils/removeAccents';
import {sortByClubName} from '../Utils/sorts';
import {matchQuery} from '../Api/queries';
import {useFirebaseAuth} from '../Context/FirebaseContext';

export const useGetMatches = (playerEmail = undefined) => {
  const [search, setSearch] = useState();
  const [searchOption, setSearchOption] = useState('name');

  const {user, isCoach} = useFirebaseAuth();

  const query = useMemo(
    () =>
      isCoach
        ? playerEmail !== undefined
          ? matchQuery
              .where('coachId', '==', user?.id)
              .where('playersEmail', 'array-contains', playerEmail)
          : matchQuery.where('coachId', '==', user?.id)
        : user?.coachId &&
          matchQuery
            .where('coachId', '==', user?.coachId)
            .where('playersEmail', 'array-contains', user?.email),
    [isCoach, user?.id, playerEmail, user?.email, user?.coachId],
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
