import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {PlayerType} from '../../Global/types';
import t from '../../Theme/theme';
import {firstSurname, shortName} from '../../Utils/parsers';
import {Avatar} from '../../Components/UI/Avatar';
import {Button} from '../../Components/UI/Button';
import {Chip} from '../../Components/UI/Chip';
import {useNewPoint} from './hooks/useNewPoint';
import {PointType} from '../../Components/NewPoint/PointType';
import {showError} from './utils/alertErrorMessages';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {
  BAJADA_DERECHA,
  BAJADA_REVES,
  BANDEJA,
  ERROR_FORCED,
  FONDO_DERECHA,
  FONDO_REVES,
  GLOBO,
  NONFORCED,
  SMASH,
  TEAM1,
  TEAM2,
  VOLEA_DERECHA,
  VOLEA_REVES,
  WINNER,
} from '../../Utils/constants';

import {LiveResult} from '../../Components/Match/LiveResult';
import {HDivider} from '../../Components/UI/HDivider';
import {useLiveMatch} from '../../Components/Match/hooks/useLiveMatch';
import {useGetMatch} from '../Match/hooks/useGetMatch';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const NEW_POINT_SCREEN_KEY = 'newPoint';

export const NewPoint = ({route}) => {
  const {matchId} = route?.params;

  const {match} = useGetMatch(matchId);
  const {handleSavePoint: onSavePoint, loading} = useLiveMatch(match);

  const {
    pointStats,
    winPointTeam,
    isResultActive,
    isPlayerActive,
    hasSavePointError,
    handlePressResult,
    isTypePointActive,
    handlePressPlayer,
    cleanNewPointForm,
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
    cleanNewPointForm();
  };

  const handleSavePoint = point => {
    if (hasSavePointError) {
      return showError.no_team();
    }
    if (isPointWithoutStatistic) {
      return handlerSavePoint({
        winPointTeam,
        points: [{info: 'Punto sin estádística'}],
      });
    } else {
      return handlerSavePoint({points: point, winPointTeam});
    }
  };

  return (
    <ScreenLayout edges={['left', 'right', 'bottom']}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={[t.flex1, t.flexGrow]}>
        <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mY5]}>
          <LiveResult game={match?.game} />
          {match?.game?.finished ? (
            <Chip text="Finalizado" mainColor="error" />
          ) : (
            <Chip text="Activo" />
          )}
        </View>
        <HDivider />
        <View style={[t.mB5, t.mT5]}>
          <Text style={[t.fontSansBold, t.mB5, t.text2xl]}>Resumen punto</Text>
          {pointStats?.length === 0 && !winPointTeam && (
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
                <View key={i}>
                  <Chip
                    text={`${
                      stat?.player?.firstName
                    } - ${stat?.point?.toUpperCase()}`}
                    mainColor={resultColor[stat?.result]}
                    withClose
                    onClose={() => handlePressRemoveStat(stat?.player?.id)}
                    style={[t.mR2, t.pX2]}
                  />
                </View>
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
              type="inform"
              style={[t.mR2]}
              active={isWinPointTeamActive(TEAM1)}
              onPress={() => handlePressWinPointTeam(TEAM1)}
            />
            <Button
              title="Gana T2"
              type="inform"
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
              <View key={`${player?.id}-${i}`}>
                <Avatar
                  disabled={!player?.id || player?.id === -1}
                  onPress={() => handlePressPlayer(player, 'team1')}
                  active={isPlayerActive(player)}
                  img={player?.profileImg}
                  name={shortName(
                    i + 1,
                    player?.firstName,
                    firstSurname(player?.secondName),
                  )}
                />
              </View>
            ))}
            <Text style={[t.textXl, t.fontSansBold, t.mB5]}>vs</Text>
            {match?.t2?.map((player: PlayerType, i: number) => (
              <View key={`${player?.id}-${i}`}>
                <Avatar
                  disabled={!player?.id || player?.id === -1}
                  key={player?.id}
                  onPress={() => handlePressPlayer(player, 'team2')}
                  active={isPlayerActive(player)}
                  img={player?.profileImg}
                  name={shortName(
                    i + 3,
                    player?.firstName,
                    firstSurname(player?.secondName),
                  )}
                />
              </View>
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
              type="inform"
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
          <PointType
            mainColor="success"
            active={isTypePointActive(GLOBO)}
            onPress={() => handlePressTypePoint(GLOBO)}>
            Globo
          </PointType>
        </View>
      </KeyboardAwareScrollView>
      <HDivider />
      <Button
        style={[t.mY3]}
        active={!match?.game?.finished}
        size="lg"
        disabled={match?.game?.finished || loading}
        title="Guardar punto"
        loading={loading}
        onPress={() => handleSavePoint(pointStats)}
        textStyle={[t.fontSansBold]}
      />
    </ScreenLayout>
  );
};
