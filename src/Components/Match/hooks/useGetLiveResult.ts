import firestore from '@react-native-firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';

export const useGetLiveResult = matchId => {
  const query = firestore().collection('matches').doc(matchId);

  const [match] = useDocumentData(query, {
    idField: 'id',
  });

  return {
    game: match?.game,
  };
};
