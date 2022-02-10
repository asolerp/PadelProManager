import {useContext, useRef, useState} from 'react';

import {AuthContext} from '../../../Context/AuthContex';
import {NewMatchContext} from '../../../Context/NewMatchContext';
import {usePermissions} from '../../../Hooks/usePermissions';

import {popScreen} from '../../../Router/utils/actions';
import {timeout} from '../../../Utils/timeout';
import {useGetPlayerId} from '../../Player/hooks/useGetPlayerId';
import {matchTeam1, matchTeam2, playersId} from '../utils/matchStructure';
import {useAddNewMatch} from './useAddNewMatch';

export const useNewMatchForm = () => {
  const newMatchFormRef = useRef();
  const {user} = useContext(AuthContext);
  const [playerPosition, setPlayerPosition] = useState();
  const {player} = useGetPlayerId();
  const [loading, setLoading] = useState(false);
  const {selectedPlayers} = useContext(NewMatchContext);
  const {addNewMatch, loading: loadingAddMatch} = useAddNewMatch();
  const {isCoach} = usePermissions();

  const handleCreateNewMatch = async values => {
    const {club, category, date, sex, round = '', tournamentName = ''} = values;

    const dateParts = date.split('/');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const newMatch = {
      date: dateObject,
      club,
      round,
      sex,
      coachId: isCoach && user?.id,
      owner: user?.id,
      tournamentName,
      state: 'live',
      category: category,
      game: {
        set: 1,
        team1: 0,
        team2: 0,
        s1t1: 0,
        s1t2: 0,
        s2t1: 0,
        s2t2: 0,
        s3t1: 0,
        s3t2: 0,
      },
      statistics: {
        s1: {
          team1: {},
          team2: {},
        },
        s2: {
          team1: {},
          team2: {},
        },
        s3: {
          team1: {},
          team2: {},
        },
        total: {
          team1: {},
          team2: {},
        },
      },
      playersId: isCoach ? playersId(selectedPlayers) : [player?.id],
      t1: isCoach ? matchTeam1(selectedPlayers) : [player, null],
      t2: isCoach ? matchTeam2(selectedPlayers) : [null, null],
    };

    setLoading(true);
    try {
      await timeout(2000);
      await addNewMatch({
        data: newMatch,
        callback: () => popScreen(),
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = () => {
    newMatchFormRef?.current.handleSubmit();
  };

  const initialValues = {
    sex: '',
    club: '',
    date: '',
    category: '',
    round: '',
    tournament: false,
  };

  return {
    handleCreateNewMatch,
    setPlayerPosition,
    handleSubmitForm,
    newMatchFormRef,
    playerPosition,
    initialValues,
    loading: loading || loadingAddMatch,
  };
};
