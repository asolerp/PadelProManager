import {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {useFirebaseAuth} from '../Context/FirebaseContext';

export const useGetPlayerByUserId = () => {
  const {user} = useFirebaseAuth();

  const [loading, setLoading] = useState<boolean>();
  const [player, setPlayer] = <any>useState();

  const onResult = QuerySnapshot => {
    setPlayer({
      ...QuerySnapshot?.docs[0]?.data(),
      id: QuerySnapshot?.docs[0]?.id,
    });
    setLoading(false);
  };

  const onError = error => {
    console.error(error);
    setLoading(false);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('players')
      .where('id', '==', user?.id)
      .onSnapshot(onResult, onError);

    return () => subscriber();
  }, [user?.id]);

  return {
    player,
    loading,
  };
};
