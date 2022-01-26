import firestore from '@react-native-firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';

export const useGetPlayers = () => {
  const query = firestore().collection('players');
  const [players, loading, error] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    players,
    loadingPlayers: loading,
    errorPlayers: error,
  };
};
