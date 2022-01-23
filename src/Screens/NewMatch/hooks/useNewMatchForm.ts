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

  const handleCreateNewMatch = () => {
    const {club, category, date, round, tournamentName} =
      newMatchFormRef?.current?.values;

    const newMatch = {
      date: new Date(date),
      club,
      round,
      tournamentName,
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
      t1: [selectedPlayers?.['1'] || null, selectedPlayers?.['2'] || null],
      t2: [selectedPlayers?.['3'] || null, selectedPlayers?.['4'] || null],
    };

    addDocument({
      data: newMatch,
      callback: () => popScreen(),
    });
  };

  const initialValues = {
    club: '',
    date: '',
    category: '',
    round: '',
  };

  return {
    handleCreateNewMatch,
    setPlayerPosition,
    newMatchFormRef,
    playerPosition,
    initialValues,
    setInputs,
    loading,
  };
};
