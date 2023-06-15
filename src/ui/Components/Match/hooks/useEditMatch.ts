import {useContext, useEffect, useState} from 'react';
import {matchQuery} from '../../../Api/queries';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';

import {useAddDocument} from '../../../Hooks/useAddDocument';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {MAP_POINTS, MAP_POINTS_TO_NUMBER} from '../../../Utils/constants';

import {timeout} from '../../../Utils/timeout';
import {
  getNumberOfSetsWonByTeam,
  getSetOfMatch,
  getStatusMatch,
  getWhoWonMatch,
} from '../utils/editGameLogic';
export const useEditMatch = ({match}) => {
  const [editedMatch, setEditedMatch] = useState({});

  const {setIsVisible: setIsVisibleLoading, setText} =
    useContext(LoadingModalContext);
  const {updateDocument} = useUpdateDocument(matchQuery);
  const {addDocument} = useAddDocument(
    matchQuery.doc(match?.id).collection('history'),
  );

  useEffect(() => {
    if (match) {
      const {team1, team2, s1t1, s2t1, s3t1, s1t2, s2t2, s3t2, service, set} =
        match?.game;
      setEditedMatch({
        service,
        team1: MAP_POINTS[team1],
        team2: MAP_POINTS[team2],
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
    setText('Actualizando resultado...');
    const matchEdited = {
      ...editedMatch,
      team1: MAP_POINTS_TO_NUMBER[editedMatch?.team1],
      team2: MAP_POINTS_TO_NUMBER[editedMatch?.team2],
      set: getSetOfMatch(editedMatch),
      ...getNumberOfSetsWonByTeam(editedMatch),
    };

    try {
      setIsVisibleLoading(true);
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
    } finally {
      await timeout(1000);
      setIsVisibleLoading(false);
    }
  };

  return {
    editedMatch,
    setEditedMatch,
    handleEditMatch,
  };
};
