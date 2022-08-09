import {useCallback, useEffect, useState} from 'react';

import {PlayerType} from '../../../Global/types';
import {NONFORCED, TEAM1, TEAM2} from '../../../Utils/constants';
import {showError} from '../utils/alertErrorMessages';

interface PointStatsType {
  player: PlayerType;
  result: string;
  point: string;
}

export const useNewPoint = () => {
  const [winPointTeam, setWinPointTeam] = useState<string>();
  const [pointStats, setPointStats] = useState<[] | PointStatsType[]>([]);
  const [playerStat, setPlayerStat] = useState<PlayerType>();
  const [resultPoint, setResultPoint] = useState();
  const [typePoint, setTypePoint] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const isPointWithoutStatistic = winPointTeam && pointStats?.length === 0;
  const isWinPointTeamActive = team => team === winPointTeam;
  const isPlayerActive = player => player?.id && player?.id === playerStat?.id;
  const isResultActive = result => resultPoint === result;
  const isTypePointActive = type => typePoint === type;

  const cleanNewPointForm = () => {
    setWinPointTeam(null),
      setPointStats([]),
      setPlayerStat(null),
      setResultPoint(null),
      setTypePoint(null);
  };

  const hasPointStatErrors = useCallback(() => {
    if (!playerStat) {
      return 'no_player';
    }
    if (!resultPoint) {
      return 'no_result';
    }
    if (!typePoint) {
      return 'no_point';
    }

    return false;
  }, [playerStat, resultPoint, typePoint]);

  const handlePressAddPointStat = useCallback(() => {
    const newStat = {
      player: playerStat,
      result: resultPoint,
      point: typePoint,
      team: playerStat?.team,
    };
    const error = hasPointStatErrors();
    if (error) {
      showError[error]();
    } else {
      console.log('NEW', newStat);
      setPointStats(oldArray => [...oldArray, newStat]);
      // setTypePoint(null);
    }
  }, [playerStat, resultPoint, typePoint, hasPointStatErrors]);

  useEffect(() => {
    if (playerStat && resultPoint && typePoint) {
      handlePressAddPointStat();
    }
  }, [playerStat, resultPoint, typePoint, handlePressAddPointStat]);

  const hasSavePointError = !winPointTeam;

  const getTotalPlayerStatistics = (statistics, team, playerId) => {
    const playerStats = statistics?.total?.[team]?.players?.[playerId];
    const total =
      playerStats?.w?.count + playerStats?.ef?.count + playerStats?.nf?.count;
    return [
      {
        color: '#4caf50',
        percentage: (playerStats?.w?.count / total) * 100 || 0,
      },
      {
        color: '#2196f3',
        percentage: (playerStats?.ef?.count / total) * 100 || 0,
      },
      {
        color: '#f44336',
        percentage: (playerStats?.nf?.count / total) * 100 || 0,
      },
    ];
  };

  const handlePressWinPointTeam = team => {
    if (winPointTeam === team) {
      setWinPointTeam(null);
    } else {
      setWinPointTeam(team);
    }
  };

  const handlePressPlayer = (player, team) => {
    if (playerStat?.id === player?.id) {
      setPlayerStat(null);
    } else {
      setPlayerStat({...player, team});
    }
  };

  const handlePressResult = result => {
    if (resultPoint === result) {
      setResultPoint(null);
      if (winPointTeam === TEAM1) {
        return setWinPointTeam(TEAM2);
      }
      return setWinPointTeam(TEAM1);
    } else {
      setResultPoint(result);
      if (result === NONFORCED) {
        if (winPointTeam === TEAM1) {
          return setWinPointTeam(TEAM2);
        }
        return setWinPointTeam(TEAM1);
      }
    }
  };

  const handlePressTypePoint = type => {
    if (typePoint === type) {
      setTypePoint(null);
    } else {
      setTypePoint(type);
    }
  };

  const handlePressRemoveStat = playerId => {
    setPointStats(pointStats.filter(stat => stat?.player?.id !== playerId));
  };

  return {
    modalOpen,
    pointStats,
    winPointTeam,
    setModalOpen,
    isPlayerActive,
    isResultActive,
    cleanNewPointForm,
    handlePressResult,
    hasSavePointError,
    handlePressPlayer,
    isTypePointActive,
    handlePressTypePoint,
    isWinPointTeamActive,
    handlePressRemoveStat,
    isPointWithoutStatistic,
    handlePressWinPointTeam,
    handlePressAddPointStat,
    getTotalPlayerStatistics,
  };
};
