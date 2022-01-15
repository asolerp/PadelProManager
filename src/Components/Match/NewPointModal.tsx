import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {PlayerType} from '../../Global/types';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {Avatar} from '../UI/Avatar';
import {Button} from '../UI/Button';
import {Chip} from '../UI/Chip';
import {useNewPoint} from './hooks/useNewPoint';
import {PointType} from './PointType';
import {showError} from './utils/alertErrorMessages';
import {
  BAJADA_DERECHA,
  BAJADA_REVES,
  BANDEJA,
  ERROR_FORCED,
  FONDO_DERECHA,
  FONDO_REVES,
  NONFORCED,
  SMASH,
  TEAM1,
  TEAM2,
  VOLEA_DERECHA,
  VOLEA_REVES,
  WINNER,
} from './utils/constants';

export const NewPointModal = ({match, onSavePoint}) => {
  const {
    pointStats,
    winPointTeam,
    isResultActive,
    isPlayerActive,
    hasSavePointError,
    handlePressResult,
    isTypePointActive,
    handlePressPlayer,
    isWinPointTeamActive,
    handlePressTypePoint,
    handlePressRemoveStat,
    isPointWithoutStatistic,
    handlePressWinPointTeam,
    handlePressAddPointStat,
  } = useNewPoint();

  const handleSavePoint = point => {
    if (hasSavePointError) {
      return showError.no_team();
    }
    if (isPointWithoutStatistic) {
      return onSavePoint({
        points: [{info: 'Punto sin estádística', team: winPointTeam}],
      });
    } else {
      return onSavePoint({points: point});
    }
  };

  return (
    <View>
      <View style={[t.mB5]}>
        <Text style={[t.fontSansBold, t.mB5]}>Resumen punto</Text>
        {pointStats.length === 0 && !winPointTeam && (
          <Text>No hay niguna estadística añadida </Text>
        )}
        <View style={[t.flexRow, t.flexWrap]}>
          {winPointTeam && (
            <Chip
              text={`Gana ${winPointTeam.toUpperCase()}`}
              styles={[t.mR2]}
            />
          )}
          {pointStats &&
            pointStats?.map((stat, i) => (
              <Chip
                key={i}
                text={`${
                  stat?.player?.firstName
                } - ${stat?.point?.toUpperCase()}`}
                type={stat?.result}
                withClose
                onClose={() => handlePressRemoveStat(stat?.player?.id)}
                styles={[t.mR2]}
              />
            ))}
        </View>
      </View>
      <View style={[t.mB5]}>
        <Text style={[t.fontSansBold, t.mB5]}>Ganador del punto</Text>
        <View style={[t.flexRow]}>
          <Button
            type="info"
            style={[t.mR2]}
            active={isWinPointTeamActive(TEAM1)}
            onPress={() => handlePressWinPointTeam(TEAM1)}>
            Gana T1
          </Button>
          <Button
            type="info"
            active={isWinPointTeamActive(TEAM2)}
            onPress={() => handlePressWinPointTeam(TEAM2)}>
            Gana T2
          </Button>
        </View>
      </View>
      <View style={[t.mB5]}>
        <Text style={[t.fontSansBold, t.mB5]}>
          Añadir estadística a jugador
        </Text>
        <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
          {Object.entries(match?.t1)?.map(
            ([key, player]: [string, PlayerType]) => (
              <Avatar
                key={key}
                onPress={() => handlePressPlayer(player)}
                active={isPlayerActive(player)}
                img={player.profileImg}
                name={shortName(player.firstName, player.secondName)}
              />
            ),
          )}
          <Text style={[t.textXl, t.fontSansBold, t.mB5]}>vs</Text>
          {Object.entries(match?.t2)?.map(
            ([key, player]: [string, PlayerType]) => (
              <Avatar
                key={key}
                onPress={() => handlePressPlayer(player)}
                active={isPlayerActive(player)}
                img={player.profileImg}
                name={shortName(player.firstName, player.secondName)}
              />
            ),
          )}
        </View>
      </View>
      <View style={[t.mB5]}>
        <View style={[t.flexRow]}>
          <Button
            type="success"
            style={[t.mR2]}
            active={isResultActive(WINNER)}
            onPress={() => handlePressResult(WINNER)}>
            Winner
          </Button>
          <Button
            type="info"
            style={[t.mR2]}
            active={isResultActive(ERROR_FORCED)}
            onPress={() => handlePressResult(ERROR_FORCED)}>
            Forzado error
          </Button>
          <Button
            type="error"
            active={isResultActive(NONFORCED)}
            onPress={() => handlePressResult(NONFORCED)}>
            No forzado
          </Button>
        </View>
      </View>
      <View style={[t.flexRow, t.flexWrap, t.justifyBetween, t.mB5]}>
        <PointType
          mainColor="info"
          active={isTypePointActive(FONDO_DERECHA)}
          onPress={() => handlePressTypePoint(FONDO_DERECHA)}>
          Fondo Derecha
        </PointType>
        <PointType
          mainColor="info"
          active={isTypePointActive(FONDO_REVES)}
          onPress={() => handlePressTypePoint(FONDO_REVES)}>
          Fondo Revés
        </PointType>
        <PointType
          mainColor="warning"
          active={isTypePointActive(VOLEA_DERECHA)}
          onPress={() => handlePressTypePoint(VOLEA_DERECHA)}>
          Volea Derecha
        </PointType>
        <PointType
          mainColor="warning"
          active={isTypePointActive(VOLEA_REVES)}
          onPress={() => handlePressTypePoint(VOLEA_REVES)}>
          Volea Revés
        </PointType>
        <PointType
          mainColor="error"
          active={isTypePointActive(BAJADA_DERECHA)}
          onPress={() => handlePressTypePoint(BAJADA_DERECHA)}>
          Bajada Derecha
        </PointType>
        <PointType
          mainColor="error"
          active={isTypePointActive(BAJADA_REVES)}
          onPress={() => handlePressTypePoint(BAJADA_REVES)}>
          Bajada Revés
        </PointType>
        <PointType
          mainColor="primary"
          active={isTypePointActive(BANDEJA)}
          onPress={() => handlePressTypePoint(BANDEJA)}>
          Bandeja
        </PointType>
        <PointType
          mainColor="secondary"
          active={isTypePointActive(SMASH)}
          onPress={() => handlePressTypePoint(SMASH)}>
          Smash
        </PointType>
      </View>
      <View style={[t.mB10]}>
        <Button
          textStyle={[t.textBlack]}
          style={[t.border0, t.bgWhite, t.shadowNone]}
          onPress={handlePressAddPointStat}>
          Añadir
        </Button>
      </View>
      <View>
        <Button
          onPress={() => handleSavePoint(pointStats)}
          textStyle={[t.textBlack, t.fontSansBold]}
          style={[t.border0, t.bgWhite, t.shadowNone]}>
          Guardar punto
        </Button>
      </View>
    </View>
  );
};
