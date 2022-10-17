import firestore from '@react-native-firebase/firestore';
import {useCallback, useEffect, useState} from 'react';
import {useFirebaseAuth} from '../Context/FirebaseContext';

import {defaultFunctions} from '../Lib/API/firebaseApp';
import {PLAYERS, USERS} from '../Models/entities';

export const useGetPlayersAndGroups = chat => {
  const {user} = useFirebaseAuth();

  const [groups, setGroups] = useState();
  const [players, setPlayers] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getGroupsFn = defaultFunctions.httpsCallable('getGroups');

  const getGroups = useCallback(async () => {
    const groupsDB = await getGroupsFn({userId: user?.id});
    const {
      data: {groupsWithFullData},
    } = groupsDB;

    setGroups(groupsWithFullData);
  }, []);

  const getPlayers = useCallback(async () => {
    const playersRef = chat
      ? firestore().collection(USERS).where('coachId', '==', user?.id)
      : firestore().collection(USERS).doc(user?.id).collection(PLAYERS);

    const playersQuery = await playersRef.get();
    const playersDocs = playersQuery.docs.map(d => ({id: d.id, ...d.data()}));

    setPlayers(playersDocs);
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      await Promise.all([getGroups(), getPlayers()]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    refetch,
    groups,
    players,
    loadingPlayers: loading,
    errorPlayers: error,
  };
};
