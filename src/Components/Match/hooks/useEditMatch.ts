import {useEffect, useState} from 'react';
import {matchQuery} from '../../../Api/queries';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {mapPoints, mapPointsToNumber} from '../../../Utils/gameLogic';
import {
  getNumberOfSetsWonByTeam,
  getSetOfMatch,
  getStatusMatch,
  getWhoWonMatch,
} from '../utils/editGameLogic';
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
    const matchEdited = {
      ...editedMatch,
      team1: mapPointsToNumber[editedMatch?.team1],
      team2: mapPointsToNumber[editedMatch?.team2],
      set: getSetOfMatch(editedMatch),
      ...getNumberOfSetsWonByTeam(editedMatch),
    };

    try {
      await updateDocument(match?.id, {
        game: {
          ...matchEdited,
          finished: getStatusMatch(matchEdited),
          winMatch: getStatusMatch(matchEdited) && getWhoWonMatch(matchEdited),
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
            alert: `Nuevo resultado: ${matchEdited?.team1}:${matchEdited?.team2} ${matchEdited?.s1t1}-${matchEdited?.s1t2},${matchEdited?.s2t1}-${matchEdited?.s2t2},${matchEdited?.s3t1}-${matchEdited?.s3t2}`,
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
