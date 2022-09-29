import {useCallback, useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {MATCHES, PLAYERS, SESSIONS, USERS} from '../../../Models/entities';
import {AuthContext} from '../../../Context/AuthContex';
import {format} from 'date-fns';
import {MatchType, PlayerType, SessionType} from '../../../Global/types';
import {fetchContentful} from '../../../Lib/API/hooks/useFetchContentful';
import {query} from '../../../Lib/API/queries/dailyExercise';

export const useGetHomeData = () => {
  const {user} = useContext(AuthContext);
  const [proMatches, setProMatches] = useState<MatchType[]>([]);
  const [todaySessions, setTodaySessions] = useState<SessionType[]>([]);
  const [liveMatches, setLiveMatches] = useState<MatchType[]>([]);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<MatchType[]>([]);
  const [dailyExercise, setDailyExercise] = useState({});
  const [loading, setLoading] = useState(false);

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const parsedStart = Number(format(start, 'T'));

  const end = new Date(start.getTime());
  end.setHours(23, 59, 59, 999);
  const parsedEnd = Number(format(end, 'T'));

  const getDailyExercise = useCallback(async () => {
    try {
      const response = await fetchContentful(query);
      setDailyExercise(response.dailyExerciseCollection.items?.[0]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getTodaySessions = useCallback(async () => {
    try {
      setLoading(true);
      const todaySessionQuery = await firestore()
        .collection(SESSIONS)
        .where('coachId', '==', user?.id)
        .where('date', '>=', parsedStart)
        .where('date', '<=', parsedEnd)
        .get();
      setTodaySessions(
        todaySessionQuery.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as SessionType[],
      );
    } catch (err) {
      console.log(err);
    }
  }, [user, parsedStart, parsedEnd]);

  const getTotalPlayers = useCallback(async () => {
    try {
      const playersQuery = await firestore()
        .collection(USERS)
        .doc(user?.id)
        .collection(PLAYERS)
        .get();
      setPlayers(
        playersQuery.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as PlayerType[],
      );
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const getProMatches = useCallback(async () => {
    try {
      const proMatchesQuery = await firestore()
        .collection(MATCHES)
        .where('category', '==', -1)
        .where('state', '==', 'finished')
        .orderBy('date')
        .get();
      setProMatches(
        proMatchesQuery.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as MatchType[],
      );
    } catch (err) {}
  }, []);

  const getLiveMatches = useCallback(async () => {
    try {
      const liveQuery = await firestore()
        .collection(MATCHES)
        .where('coachId', '==', user?.id)
        .where('state', '==', 'live')
        .get();

      setLiveMatches(
        liveQuery.docs.map(doc => ({id: doc.id, ...doc.data()})) as MatchType[],
      );
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const getFinishedMatches = useCallback(async () => {
    try {
      const finishedMatchesQuery = await firestore()
        .collection(MATCHES)
        .where('coachId', '==', user?.id)
        .where('state', '==', 'finished')
        .orderBy('date', 'desc')
        .limit(5)
        .get();

      setFinishedMatches(
        finishedMatchesQuery.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as MatchType[],
      );
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const refetch = async () => {
    try {
      setLoading(true);
      await Promise.all([
        getFinishedMatches(),
        getDailyExercise(),
        getTodaySessions(),
        getTotalPlayers(),
        getLiveMatches(),
        getProMatches(),
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    refetch,
    players,
    loading,
    proMatches,
    liveMatches,
    dailyExercise,
    todaySessions,
    finishedMatches,
  };
};
