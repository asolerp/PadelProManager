import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';

import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {TIPS} from '../../../Models/entities';

export const useTips = ({playerEmail}) => {
  const {user} = useFirebaseAuth();

  const [localTip, setLocalTip] = useState();
  const tipRef = firestore().collection(TIPS).doc(`${user?.id}-${playerEmail}`);
  const [loading, setLoading] = useState();

  const [playerTip] = useDocumentData(tipRef, {
    idField: 'id',
  });

  useEffect(() => {
    if (playerTip) {
      setLocalTip(playerTip.content);
    }
  }, [playerTip]);

  const handleSaveTips = async () => {
    setLoading(true);
    try {
      await firestore().collection(TIPS).doc(`${user?.id}-${playerEmail}`).set({
        content: localTip,
        createdAt: new Date(),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    playerTip,
    localTip,
    setLocalTip,
    handleSaveTips,
  };
};
