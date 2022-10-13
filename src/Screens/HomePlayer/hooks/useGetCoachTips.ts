import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {AuthContext} from '../../../Context/AuthContex';
import {TIPS} from '../../../Models/entities';
export const useGetCoachTips = () => {
  const {user} = useContext(AuthContext);

  const tipRef = firestore()
    .collection(TIPS)
    .doc(`${user?.coachId}-${user?.email}`);

  const [tip] = useDocumentData(tipRef, {
    idField: 'id',
  });

  return {
    tip,
  };
};
