import {useContext, useMemo, useState} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {AuthContext} from '../Context/AuthContex';
import {removeAccents} from '../Utils/removeAccents';
import {sortByClubName} from '../Utils/sorts';
import {matchQuery} from '../Api/queries';

export const useGetMatches = (playerEmail = undefined) => {
  const {user, isCoach} = useContext(AuthContext);
  const [search, setSearch] = useState();
  const [searchOption, setSearchOption] = useState('name');

  const query = useMemo(
    () =>
      isCoach
        ? playerEmail !== undefined
          ? matchQuery.where('playersEmail', 'array-contains', playerEmail)
          : matchQuery.where('coachId', '==', user?.id)
        : matchQuery.where('playersEmail', 'array-contains', user?.email),
    [isCoach, user?.id, playerEmail, user?.email],
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
