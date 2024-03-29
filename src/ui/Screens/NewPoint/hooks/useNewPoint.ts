import {useState} from 'react';

import {PlayerType} from '../../../Global/types';
import {NONFORCED, TEAM1, TEAM2} from '../../../Utils/constants';

interface PointStatsType {
  player: PlayerType;
  result: string;
  point: string;
  team: string;
}

export const useNewPoint = () => {
  const [winPointTeam, setWinPointTeam] = useState<string>();
  const [pointStats, setPointStats] = useState<[] | PointStatsType[]>([]);
  const [playerStat, setPlayerStat] = useState<PlayerType>();
  const [resultPoint, setResultPoint] = useState();
  const [typePoint, setTypePoint] = useState();
  const [usedPoints, setUsedPoints] = useState({});

  const checkIfIsInPointStats = id =>
    pointStats.some(ps => ps.player.id === id);

  const isPointWithoutStatistic = winPointTeam && pointStats?.length === 0;
  const isWinPointTeamActive = team => team === winPointTeam;
  const isPlayerActive = player => player?.id && player?.id === playerStat?.id;
  const isResultActive = result => resultPoint === result;
  const isTypePointActive = type => typePoint === type;

  const cleanNewPointForm = () => {
    setWinPointTeam(null);
    setPointStats([]);
    setPlayerStat(null);
    setResultPoint(null);
    setTypePoint(null);
    setUsedPoints({});
  };

  const handlePressAddPointStat = ({player, result, point, team}) => {
    const newStat = {
      player,
      result,
      point,
      team,
    };

    const filteredPointStats = pointStats
      .filter(ps => ps.team !== newStat.team)
      .filter(ps => ps.player.id !== newStat.player.id);
    setPointStats([...filteredPointStats, newStat]);
  };

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

  const handleOnDrop = ({area, match, point}) => {
    if (!area) {
      return;
    }
    handlePressTypePoint(point.type);
    if (area === 1 || area === 2) {
      if (resultPoint === NONFORCED) {
        handlePressWinPointTeam(TEAM2);
      } else {
        handlePressWinPointTeam(TEAM1);
      }
      if (area === 1) {
        handlePressAddPointStat({
          player: match?.t1?.[0],
          result: resultPoint,
          point: point.type,
          team: TEAM1,
        });
        setUsedPoints({
          ...Object.fromEntries(
            Object.entries(usedPoints)
              .filter(([key, value]) => value.team !== TEAM1)
              .filter(([key, value]) => value.id !== match?.t1?.[0].id),
          ),
          [resultPoint]: {
            id: match?.t1?.[0].id,
            result: resultPoint,
            type: point.type,
            team: TEAM1,
          },
        });
        return handlePressPlayer(match?.t1?.[0], TEAM1);
      }
      if (area === 2) {
        handlePressAddPointStat({
          player: match?.t1?.[1],
          result: resultPoint,
          point: point.type,
          team: TEAM1,
        });
        setUsedPoints({
          ...Object.fromEntries(
            Object.entries(usedPoints).filter(
              ([key, value]) => value.id !== match?.t1?.[1].id,
            ),
          ),
          [resultPoint]: {
            id: match?.t1?.[1].id,
            result: resultPoint,
            type: point.type,
            team: TEAM1,
          },
        });
        return handlePressPlayer(match?.t1?.[1], TEAM1);
      }
    }
    if (area === 3 || area === 4) {
      if (resultPoint === NONFORCED) {
        handlePressWinPointTeam(TEAM1);
      } else {
        handlePressWinPointTeam(TEAM2);
      }
      if (area === 3) {
        handlePressAddPointStat({
          player: match?.t2?.[0],
          result: resultPoint,
          point: point.type,
          team: TEAM2,
        });
        setUsedPoints({
          ...Object.fromEntries(
            Object.entries(usedPoints).filter(
              ([key, value]) => value.id !== match?.t2?.[0].id,
            ),
          ),
          [resultPoint]: {
            id: match?.t2?.[0].id,
            result: resultPoint,
            type: point.type,
            team: TEAM2,
          },
        });
        return handlePressPlayer(match?.t2?.[0], TEAM2);
      }
      if (area === 4) {
        handlePressAddPointStat({
          player: match?.t2?.[1],
          result: resultPoint,
          point: point.type,
          team: TEAM2,
        });
        setUsedPoints({
          ...Object.fromEntries(
            Object.entries(usedPoints).filter(
              ([key, value]) => value.id !== match?.t2?.[1].id,
            ),
          ),
          [resultPoint]: {
            id: match?.t2?.[1].id,
            result: resultPoint,
            type: point.type,
            team: TEAM2,
          },
        });
        return handlePressPlayer(match?.t2?.[1], TEAM2);
      }
    }
  };

  return {
    typePoint,
    usedPoints,
    pointStats,
    resultPoint,
    winPointTeam,
    handleOnDrop,
    setUsedPoints,
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
    checkIfIsInPointStats,
    isPointWithoutStatistic,
    handlePressWinPointTeam,
    handlePressAddPointStat,
  };
};
