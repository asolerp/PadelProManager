import {useCallback, useEffect, useState} from 'react';

import {PlayerType} from '../../../Global/types';
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

  const hasPointStatErrors = useCallback(
    newPoint => {
      if (!playerStat) {
        return 'no_player';
      }
      if (!resultPoint) {
        return 'no_result';
      }
      if (!typePoint) {
        return 'no_point';
      }
      if (pointStats.some(stat => stat?.result === newPoint?.result)) {
        return 'duplicated_result';
      }
      if (pointStats.some(stat => stat?.player?.id === newPoint?.player?.id)) {
        return 'duplicated_player';
      } else {
        return false;
      }
    },
    [playerStat, resultPoint, typePoint, pointStats],
  );

  const handlePressAddPointStat = useCallback(() => {
    const newStat = {
      player: playerStat,
      result: resultPoint,
      point: typePoint,
      team: playerStat?.team,
    };
    const error = hasPointStatErrors(newStat);
    if (error) {
      showError[error]();
    } else {
      setPointStats(oldArray => [...oldArray, newStat]);
      setPlayerStat(null);
      setResultPoint(null);
      setTypePoint(null);
    }
  }, [playerStat, resultPoint, typePoint, hasPointStatErrors]);

  useEffect(() => {
    if (playerStat && resultPoint && typePoint) {
      handlePressAddPointStat();
    }
  }, [playerStat, resultPoint, typePoint, handlePressAddPointStat]);

  const hasSavePointError = !winPointTeam;

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
    } else {
      setResultPoint(result);
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
    pointStats,
    winPointTeam,
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
  };
};
