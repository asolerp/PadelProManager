import {useFetchContentFul} from '../../../Lib/API/hooks/useFetchContentful';
import {query} from '../../../Lib/API/queries/dailyExercise';

export const useGetDailyExercise = () => {
  const {data, loading} = useFetchContentFul({query});

  return {
    loading,
    dailyExercise: data?.dailyExerciseCollection?.items?.[0],
  };
};
