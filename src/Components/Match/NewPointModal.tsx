import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
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
import debounce from 'lodash.debounce';

export const NewPointModal = ({match, loading, onSavePoint}) => {
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
  } = useNewPoint();

  const resultColor = {
    w: 'success',
    ef: 'info',
    nf: 'error',
  };

  const handlerSavePoint = point => {
    onSavePoint(point);
  };

  const debouncedSavePoint = useCallback(debounce(handlerSavePoint, 300), []);

  const handleSavePoint = point => {
    if (hasSavePointError) {
      return showError.no_team();
    }
    if (isPointWithoutStatistic) {
      return debouncedSavePoint({
        winPointTeam,
        points: [{info: 'Punto sin estádística'}],
      });
    } else {
      return debouncedSavePoint({points: point, winPointTeam});
    }
  };

  return (
    <View style={[t.mB3]}>
      <View style={[t.mB5]}>
        <Text style={[t.fontSansBold, t.mB5, t.text2xl]}>Resumen punto</Text>
        {pointStats.length === 0 && !winPointTeam && (
          <Text style={[t.fontSansMedium, t.textBase]}>
            No hay niguna estadística añadida{' '}
          </Text>
        )}
        <View style={[t.flexRow, t.flexWrap]}>
          {winPointTeam && (
            <Chip
              text={`Gana ${winPointTeam.toUpperCase()}`}
              style={[t.mR2, t.pX2]}
            />
          )}
          {pointStats &&
            pointStats?.map((stat, i) => (
              <Chip
                key={i}
                text={`${
                  stat?.player?.firstName
                } - ${stat?.point?.toUpperCase()}`}
                mainColor={resultColor[stat?.result]}
                withClose
                onClose={() => handlePressRemoveStat(stat?.player?.id)}
                style={[t.mR2, t.pX2]}
              />
            ))}
        </View>
      </View>
      <View style={[t.mB5]}>
        <Text style={[t.fontSansBold, t.text2xl, t.mB5]}>
          Ganador del punto
        </Text>
        <View style={[t.flexRow]}>
          <Button
            title="Gana T1"
            type="info"
            style={[t.mR2]}
            active={isWinPointTeamActive(TEAM1)}
            onPress={() => handlePressWinPointTeam(TEAM1)}
          />
          <Button
            title="Gana T2"
            type="info"
            active={isWinPointTeamActive(TEAM2)}
            onPress={() => handlePressWinPointTeam(TEAM2)}
          />
        </View>
      </View>
      <View style={[t.mB5]}>
        <Text style={[t.fontSansBold, t.text2xl, t.mB5]}>
          Añadir estadística
        </Text>
        <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
          {match?.t1?.map((player: PlayerType, i: number) => (
            <Avatar
              disabled={!player?.id}
              key={player?.id || i}
              onPress={() => handlePressPlayer(player, 'team1')}
              active={isPlayerActive(player)}
              img={player?.profileImg}
              name={shortName(i + 1, player?.firstName, player?.secondName)}
            />
          ))}
          <Text style={[t.textXl, t.fontSansBold, t.mB5]}>vs</Text>
          {match?.t2?.map((player: PlayerType, i: number) => (
            <Avatar
              disabled={!player?.id}
              key={player?.id}
              onPress={() => handlePressPlayer(player, 'team2')}
              active={isPlayerActive(player)}
              img={player?.profileImg}
              name={shortName(i + 3, player?.firstName, player?.secondName)}
            />
          ))}
        </View>
      </View>
      <View style={[t.mB5]}>
        <View style={[t.flexRow]}>
          <Button
            title="Winner"
            type="success"
            style={[t.mR2]}
            active={isResultActive(WINNER)}
            onPress={() => handlePressResult(WINNER)}
          />
          <Button
            title="Fuerza error"
            type="info"
            style={[t.mR2]}
            active={isResultActive(ERROR_FORCED)}
            onPress={() => handlePressResult(ERROR_FORCED)}
          />
          <Button
            title="No forzado"
            type="error"
            active={isResultActive(NONFORCED)}
            onPress={() => handlePressResult(NONFORCED)}
          />
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

      <View>
        <Button
          active
          size="lg"
          title="Guardar punto"
          loading={loading}
          onPress={() => handleSavePoint(pointStats)}
          textStyle={[t.fontSansBold]}
        />
      </View>
    </View>
  );
};
