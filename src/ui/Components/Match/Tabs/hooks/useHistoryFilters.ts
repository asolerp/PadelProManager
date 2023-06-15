import {useEffect, useState} from 'react';

export const useHistoryFilters = (match, history) => {
  const sortedHistory = list =>
    list?.sort(
      (a, b) => new Date(b?.date.toDate()) - new Date(a?.date.toDate()),
    );

  const [favoriteFilter, setFavoriteFilter] = useState<boolean>();
  const [historyList, setHistoryList] = useState<any>();

  useEffect(() => {
    if (history) {
      setHistoryList(sortedHistory(history));
    }
  }, [history]);

  useEffect(() => {
    if (favoriteFilter) {
      const filterdList = historyList?.filter(h =>
        match?.favoritePoints?.some(pointId => pointId === h?.id),
      );
      return setHistoryList(filterdList);
    }
    return setHistoryList(sortedHistory(history));
  }, [favoriteFilter]);

  return {
    historyList,
    favoriteFilter,
    setFavoriteFilter,
  };
};
