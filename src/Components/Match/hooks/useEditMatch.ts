import {useEffect, useState} from 'react';
import {matchQuery} from '../../../Api/queries';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {mapPoints, mapPointsToNumber} from '../../../Utils/gameLogic';
export const useEditMatch = ({match}) => {
  const [editedMatch, setEditedMatch] = useState({});

  const {updateDocument, loading} = useUpdateDocument(matchQuery);
  const {addDocument} = useAddDocument(
    matchQuery.doc(match?.id).collection('history'),
  );

  useEffect(() => {
    if (match) {
      const {team1, team2, s1t1, s2t1, s3t1, s1t2, s2t2, s3t2, service, set} =
        match?.game;
      setEditedMatch({
        service,
        team1: mapPoints[team1],
        team2: mapPoints[team2],
        s1t1,
        s2t1,
        s3t1,
        s1t2,
        s2t2,
        s3t2,
        set,
      });
    }
  }, [match]);

  const handleEditMatch = async () => {
    try {
      await updateDocument(match?.id, {
        game: {
          ...editedMatch,
          team1: mapPointsToNumber[editedMatch?.team1],
          team2: mapPointsToNumber[editedMatch?.team2],
        },
      });
      await Promise.all([
        addDocument({
          data: {
            date: new Date(),
            alert: '🚨 Modificación de resultado 🚨',
            type: 'warning',
          },
        }),
        addDocument({
          data: {
            date: new Date(),
            alert: `Nuevo resultado: ${editedMatch?.team1}:${editedMatch?.team2} ${editedMatch?.s1t1}-${editedMatch?.s1t2},${editedMatch?.s2t1}-${editedMatch?.s2t2},${editedMatch?.s3t1}-${editedMatch?.s3t2}`,
            type: 'info',
          },
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    editedMatch,
    setEditedMatch,
    handleEditMatch,
  };
};
