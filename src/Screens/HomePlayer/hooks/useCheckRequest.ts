import {requestQuery} from '../../../Api/queries';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {USERS} from '../../../Models/entities';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useCheckRequest = () => {
  const {user} = useFirebaseAuth();
  const [coach, setCoach] = useState();
  const query = requestQuery.where('playerEmail', '==', user?.email);
  const responseInvitationRQ = defaultFunctions.httpsCallable('newPlayer');

  const [pendingRequest] = useCollectionData(query, {
    idField: 'id',
  });

  useEffect(() => {
    const getCoach = async coachId => {
      const coachQuery = await firestore().collection(USERS).doc(coachId).get();
      const coachDoc = {id: coachQuery.id, ...coachQuery.data()};
      setCoach(coachDoc);
    };
    if (pendingRequest?.length > 0) {
      getCoach(pendingRequest[0].coachId);
    }
  }, [pendingRequest]);

  return {
    coach,
    pendingRequest,
    responseInvitationRQ,
  };
};
