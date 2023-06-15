import firestore from '@react-native-firebase/firestore';

import {useEffect, useState} from 'react';
import {USERS} from '../../../Models/entities';

export const useGetCoach = ({coachId}) => {
  const [coach, setCoach] = useState();

  useEffect(() => {
    const getCoachData = async () => {
      const coachQuery = await firestore().collection(USERS).doc(coachId).get();

      const coachDoc = {id: coachQuery.id, ...coachQuery.data()};

      setCoach(coachDoc);
    };
    if (coachId) {
      getCoachData();
    }
  }, [coachId]);

  return {
    coach,
  };
};
