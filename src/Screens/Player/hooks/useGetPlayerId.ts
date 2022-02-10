import {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../../../Context/AuthContex';
import firestore from '@react-native-firebase/firestore';

export const useGetPlayerId = () => {
  const {user} = useContext(AuthContext);
  const [player, setPlayer] = <any>useState();

  useEffect(() => {
    const getPlayerId = async () => {
      const playerRef = await firestore()
        .collection('players')
        .where('id', '==', user?.id)
        .get();
      setPlayer({...playerRef.docs[0].data(), id: playerRef.docs[0].id});
    };
    getPlayerId();
  }, []);

  return {
    player,
  };
};
