import {format, parse, parseISO, toDate} from 'date-fns';
import {useContext, useRef, useState} from 'react';
import {matchQuery} from '../../../Api/queries';
import {NewMatchContext} from '../../../Components/Context/NewMatchContext';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {popScreen} from '../../../Router/utils/actions';

export const useNewMatchForm = () => {
  const newMatchFormRef = useRef();
  const [playerPosition, setPlayerPosition] = useState();
  const [inputs, setInputs] = useState();

  const {selectedPlayers} = useContext(NewMatchContext);
  const {addDocument, loading} = useAddDocument(matchQuery);

  const handleCreateNewMatch = values => {
    const {club, category, date, sex, round = '', tournamentName = ''} = values;

    const dateParts = date.split('/');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const newMatch = {
      date: dateObject,
      club,
      round,
      sex,
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
        selectedPlayers?.['1']?.id || null,
        selectedPlayers?.['2']?.id || null,
        selectedPlayers?.['3']?.id || null,
        selectedPlayers?.['4']?.id || null,
      ].filter(pId => pId !== null),
      t1: [selectedPlayers?.['1'] || null, selectedPlayers?.['2'] || null],
      t2: [selectedPlayers?.['3'] || null, selectedPlayers?.['4'] || null],
    };

    addDocument({
      data: newMatch,
      callback: () => popScreen(),
    });
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
    setInputs,
    loading,
  };
};
