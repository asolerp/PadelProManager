import {useContext, useRef, useState} from 'react';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';

import {NewMatchContext} from '../../../Context/NewMatchContext';
import {usePermissions} from '../../../Hooks/usePermissions';

import {popScreen} from '../../../Router/utils/actions';
import {timeout} from '../../../Utils/timeout';

import {
  matchTeam1,
  matchTeam2,
  playersEmails,
  playersId,
} from '../utils/matchStructure';
import {useAddNewMatch} from './useAddNewMatch';

const emptyPlayer = {
  firstName: 'Jugador sin segumiento',
  id: -1,
  profileImg:
    'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg',
  secondName: '',
};

export const useNewMatchForm = () => {
  const newMatchFormRef = useRef();
  const {user} = useFirebaseAuth();

  const [playerPosition, setPlayerPosition] = useState();
  const [loading, setLoading] = useState(false);
  const {selectedPlayers} = useContext(NewMatchContext);
  const {addNewMatch, loading: loadingAddMatch} = useAddNewMatch();
  const {isCoach, isAdmin} = usePermissions();
  const [errorPlayers, setErrorPlayers] = useState(false);

  const handleCreateNewMatch = async values => {
    const {
      club,
      category,
      date,
      sex,
      round = '',
      tournamentName = '',
      goldPoint,
    } = values;

    const dateParts = date.split('/');
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const newMatch = {
      date: dateObject,
      club,
      round,
      sex,
      coachId: (isCoach || isAdmin) && user?.id,
      owner: user?.id,
      tournamentName,
      state: 'live',
      category: category,
      game: {
        set: 1,
        team1: 0,
        team2: 0,
        consecutiveWon: 0,
        lastPointWon: '',
        s1t1: 0,
        s1t2: 0,
        s2t1: 0,
        s2t2: 0,
        s3t1: 0,
        s3t2: 0,
        winsSetTeam1: 0,
        winsSetTeam2: 0,
        goldPoint,
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
          team1: {
            global: {
              consecutiveWon: 0,
            },
          },
          team2: {
            global: {
              consecutiveWon: 0,
            },
          },
        },
      },
      playersEmail:
        isCoach || isAdmin ? playersEmails(selectedPlayers) : [user?.email],
      playersId: isCoach || isAdmin ? playersId(selectedPlayers) : [user?.id],
      t1:
        isCoach || isAdmin ? matchTeam1(selectedPlayers) : [user, emptyPlayer],
      t2:
        isCoach || isAdmin
          ? matchTeam2(selectedPlayers)
          : [emptyPlayer, emptyPlayer],
    };

    setLoading(true);
    try {
      console.log('NEW MATCH', newMatch);
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

  const handleSubmitForm = values => {
    if (selectedPlayers?.length < 4 && isCoach) {
      setErrorPlayers(true);
    } else {
      setErrorPlayers(false);
      handleCreateNewMatch(values);
    }
  };

  const initialValues = {
    sex: '',
    club: '',
    date: '',
    category: '',
    round: '',
    goldPoint: false,
    tournament: false,
  };

  return {
    loading: loading || loadingAddMatch,
    handleCreateNewMatch,
    setPlayerPosition,
    handleSubmitForm,
    selectedPlayers,
    newMatchFormRef,
    playerPosition,
    initialValues,
    errorPlayers,
  };
};
