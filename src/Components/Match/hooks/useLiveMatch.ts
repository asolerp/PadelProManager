import {useState} from 'react';

import {tennisGameLogic} from '../../../Utils/gameLogic';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {useAddDocument} from '../../../Hooks/useAddDocument';

import firestore from '@react-native-firebase/firestore';

export const useLiveMatch = match => {
  const query = firestore().collection('matches');
  const {updateDocument} = useUpdateDocument(query);
  const {addDocument} = useAddDocument(
    query.doc(match?.id).collection('history'),
  );

  const handleSavePoint = async stats => {
    const newStateGame = tennisGameLogic(match?.game, stats.points);

    await updateDocument(match?.id, {
      game: newStateGame,
    });
    await addDocument({
      data: {...stats, date: new Date(), gameState: newStateGame},
    });
  };

  return {
    handleSavePoint,
  };
};
