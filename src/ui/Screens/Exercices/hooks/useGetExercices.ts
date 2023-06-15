import {useFetchContentFul} from '../../../Lib/API/hooks/useFetchContentful';
import {query} from '../../../Lib/API/queries/exercices';
import firestore from '@react-native-firebase/firestore';
import {ANALYTICS} from '../../../Models/entities';
import {info} from '../../../Lib/Logging';

export const useGetExercices = ({group}) => {
  const {
    data: {padelProManagerCollection: {items} = []} = {},
    loading,
    onRefresh,
    refreshing,
  } = useFetchContentFul({query: query(group)});

  const handleClickMoreExercises = async () => {
    try {
      await firestore()
        .collection(ANALYTICS)
        .doc('exercises')
        .update({
          count: firestore.FieldValue.increment(1),
        });
    } catch (err) {
      console.log(err);
    } finally {
      info({
        title: 'Muchas gracias',
        subtitle: 'Estamos trabajando para darte más contenido.',
      });
    }
  };

  return {
    exercices: items?.sort((a, b) => a.id - b.id),
    handleClickMoreExercises,
    refreshing,
    onRefresh,
    loading,
  };
};
