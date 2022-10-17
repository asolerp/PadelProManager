import {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  MATCHES,
  PLAYERS,
  SESSIONS,
  TIPS,
  USERS,
} from '../../../Models/entities';

import {format} from 'date-fns';
import {MatchType, SessionType, UserType} from '../../../Global/types';
import {fetchContentful} from '../../../Lib/API/hooks/useFetchContentful';
import {query} from '../../../Lib/API/queries/dailyExercise';

import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {userQuery} from '../../../Api/queries';

export const useGetHomePlayerData = () => {
  const {user} = useFirebaseAuth();

  const [proMatches, setProMatches] = useState<MatchType[]>([]);
  const [todaySessions, setTodaySessions] = useState<SessionType[]>([]);
  const [liveMatches, setLiveMatches] = useState<MatchType[]>([]);
  const [coach, setCoach] = useState<UserType>();
  const [tips, setTips] = useState();

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

  const getCoachTips = useCallback(async () => {
    const tipQuery = await firestore()
      .collection(TIPS)
      .doc(`${user?.coachId}-${user?.email}`)
      .get();
    const tipsDoc = tipQuery.data();
    setTips(tipsDoc);
  }, [user?.coachId, user?.email]);

  const getCoach = useCallback(async () => {
    try {
      if (!user?.coachId) {
        return setCoach(null);
      }
      const coachQuery = await userQuery.doc(user?.coachId).get();
      const coachDoc = {id: coachQuery.id, ...coachQuery.data()};
      setCoach(coachDoc);
    } catch (err) {
      console.log(err);
    }
  }, [user?.coachId]);

  const getTodaySessions = useCallback(async () => {
    try {
      setLoading(true);
      const todaySessionQuery = await firestore()
        .collection(SESSIONS)
        .where('playersEmail', 'array-contains', user?.email)
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

  const getProMatches = useCallback(async () => {
    try {
      const proMatchesQuery = await firestore()
        .collection(MATCHES)
        .where('category', '==', -1)
        .where('state', '==', 'finished')
        .orderBy('date')
        .limit(5)
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
        .where('coachId', '==', user?.coachId)
        .where('playersEmail', 'array-contains', user?.email)
        .where('state', '==', 'live')
        .get();

      setLiveMatches(
        liveQuery.docs.map(doc => ({id: doc.id, ...doc.data()})) as MatchType[],
      );
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const refetch = async () => {
    try {
      setLoading(true);
      await Promise.all([
        getDailyExercise(),
        getTodaySessions(),
        getCoach(),
        getCoachTips(),
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
    tips,
    coach,
    refetch,
    loading,
    proMatches,
    liveMatches,
    dailyExercise,
    todaySessions,
  };
};
