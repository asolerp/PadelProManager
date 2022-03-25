import {useFetchContentFul} from '../../../Lib/API/hooks/useFetchContentful';
import {query} from '../../../Lib/API/queries/exercices';

export const useGetExercices = ({group}) => {
  const {
    data: {padelProManagerCollection: {items} = []} = {},
    loading,
    onRefresh,
    refreshing,
  } = useFetchContentFul({query: query(group)});

  return {
    exercices: items,
    refreshing,
    onRefresh,
    loading,
  };
};
