import {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../Context/AuthContex';
import firestore from '@react-native-firebase/firestore';

export const useGetPlayerByUserId = () => {
  const {user} = useContext(AuthContext);
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
