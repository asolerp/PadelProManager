import {useContext, useRef, useState} from 'react';

import {AuthContext} from '../../../Context/AuthContex';
import {NewMatchContext} from '../../../Context/NewMatchContext';

import {popScreen} from '../../../Router/utils/actions';
import {timeout} from '../../../Utils/timeout';
import {useAddNewMatch} from './useAddNewMatch';

export const useNewMatchForm = () => {
  const newMatchFormRef = useRef();
  const {user} = useContext(AuthContext);
  const [playerPosition, setPlayerPosition] = useState();
  const [loading, setLoading] = useState(false);
  const {selectedPlayers} = useContext(NewMatchContext);
  const {addNewMatch, loading: loadingAddMatch} = useAddNewMatch();

  const handleCreateNewMatch = async values => {
    const {club, category, date, sex, round = '', tournamentName = ''} = values;

    const dateParts = date.split('/');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const newMatch = {
      date: dateObject,
      club,
      round,
      sex,
      coachId: user?.id,
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
      playersId: [
        !selectedPlayers?.['1']
          ? null
          : selectedPlayers?.['1']?.id !== -1
          ? selectedPlayers?.['1']?.id
          : null,
        !selectedPlayers?.['2']
          ? null
          : selectedPlayers?.['2']?.id !== -1
          ? selectedPlayers?.['2']?.id
          : null,
        !selectedPlayers?.['3']
          ? null
          : selectedPlayers?.['3']?.id !== -1
          ? selectedPlayers?.['3']?.id
          : null,
        !selectedPlayers?.['4']
          ? null
          : selectedPlayers?.['4']?.id !== -1
          ? selectedPlayers?.['4']?.id
          : null,
      ].filter(pId => pId !== null),
      t1: [
        !selectedPlayers?.['1']
          ? null
          : selectedPlayers?.['1']?.id !== -1
          ? selectedPlayers?.['1']
          : null,
        !selectedPlayers?.['2']
          ? null
          : selectedPlayers?.['2']?.id !== -1
          ? selectedPlayers?.['2']
          : null,
      ],
      t2: [
        !selectedPlayers?.['3']
          ? null
          : selectedPlayers?.['3']?.id !== -1
          ? selectedPlayers?.['3']
          : null,
        !selectedPlayers?.['4']
          ? null
          : selectedPlayers?.['4']?.id !== -1
          ? selectedPlayers?.['4']
          : null,
      ],
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
