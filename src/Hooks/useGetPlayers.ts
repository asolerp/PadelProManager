import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {AuthContext} from '../Context/AuthContex';

export const useGetPlayers = () => {
  const {user} = useContext(AuthContext);

  const query = firestore()
    .collection('players')
    .where('coach', 'array-contains', user?.id);
  const [players, loading, error] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    players,
    loadingPlayers: loading,
    errorPlayers: error,
  };
};
