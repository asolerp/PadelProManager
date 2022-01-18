import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {useState} from 'react';

export const useHistory = matchId => {
  const [comment, setComment] = useState();

  const query = firestore().collection('matches');
  const historyQuery = firestore()
    .collection('matches')
    .doc(matchId)
    .collection('history');

  const {updateDocument} = useUpdateDocument(query);
  const {updateDocument: updateHistoryPoint} = useUpdateDocument(historyQuery);

  const handleAddComment = (pointHistoryId, callback) => {
    updateHistoryPoint(
      pointHistoryId,
      {
        comment,
      },
      () => {
        setComment(null);
        callback();
      },
    );
  };

  const handleDeleteComment = (
    pointHistoryId: string,
    callback?: () => void,
  ) => {
    updateHistoryPoint(
      pointHistoryId,
      {
        comment: null,
      },
      () => callback(),
    );
  };

  const handleAddAsFavorite = (historyPointId, isSaved) => {
    if (isSaved) {
      updateDocument(matchId, {
        favoritePoints:
          firebase.firestore.FieldValue.arrayRemove(historyPointId),
      });
    } else {
      updateDocument(matchId, {
        favoritePoints:
          firebase.firestore.FieldValue.arrayUnion(historyPointId),
      });
    }
  };

  return {
    handleAddComment,
    handleDeleteComment,
    handleAddAsFavorite,
    comment,
    setComment,
  };
};
