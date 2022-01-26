import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

export const useGetMatch = (matchId: string) => {
  const query = firestore().collection('matches').doc(matchId);

  const [isStartTeamAssigned, setIsStartTeamAssigned] = useState(false);
  const [match, loadingMatch, errorMatch] = useDocumentData(query, {
    idField: 'id',
  });

  const [history, loadingHistory, errorHistory] = useCollectionData(
    query.collection('history'),
    {
      idField: 'id',
    },
  );

  const [notes, loadingNotes, errorNotes] = useCollectionData(
    query.collection('notes'),
    {
      idField: 'id',
    },
  );

  useEffect(() => {
    if (match) {
      match?.game?.service
        ? setIsStartTeamAssigned(false)
        : setIsStartTeamAssigned(true);
    }
  }, [match]);

  const loading = loadingMatch || loadingHistory || loadingNotes;
  const error = errorMatch || errorHistory || errorNotes;
  const isMatchFinished = match?.state === 'finished';

  return {
    notes,
    match,
    history,
    isMatchFinished,
    errorMatch: error,
    loadingMatch: loading,
    isStartTeamAssigned,
  };
};
