import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {View, StyleSheet, Pressable, Text, Dimensions} from 'react-native';
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

import {CircleChart} from '../../Components/Match/CircleChart';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {Header} from '../../Components/Layout';
import {useAnimationGesturePoint} from './hooks/useAnimationGesturePoint';

export const NEW_POINT_SCREEN_KEY = 'newPoint';
const MODAL_WIDTH = 340;
const MODAL_HEIGHT = 500;

export const NewPoint = ({route}) => {
  const {matchId} = route?.params;
  const [areas, setAreas] = useState({});
  const {match} = useGetMatch(matchId);
  const {handleSavePoint: onSavePoint, loading} = useLiveMatch(match);

  const {
    modalOpen,
    pointStats,
    winPointTeam,
    setModalOpen,
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
    getTotalPlayerStatistics,
  } = useNewPoint();

  const handlerSavePoint = point => {
    onSavePoint(point, () => setModalOpen(false));
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
    <ScreenLayout>
      <Header
        withBack
        title={<LiveResult game={match?.game} />}
        rightSide={
          <View
            style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mY5, t.pX4]}>
            {match?.game?.finished ? (
              <Chip text="Finalizado" mainColor="error" />
            ) : (
              <Chip text="Activo" />
            )}
          </View>
        }
      />
      {modalOpen && (
        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={[
            styles.modalPoints,
            t.shadow2xl,
            t.justifyCenter,
            t.itemsCenter,
            t.flexCol,
            t.pY2,
            t.pX4,
            t.borderGray200,
            t.bgWhite,
            t.rounded,
            t.absolute,
            t.z10,
          ]}>
          <View>
            <View style={[t.flexRow, t.flex, t.justifyEnd, t.mT10]}>
              <Pressable
                onPress={() => {
                  cleanNewPointForm();
                  setModalOpen(false);
                }}>
                <Icon name="close" size={25} style={[t.textBlack]} />
              </Pressable>
            </View>
            <View style={[t.mT5, t.itemsCenter]}>
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
                  onPress={() => {
                    handlePressResult(NONFORCED);
                  }}
                />
              </View>
            </View>
            <View style={[t.flexGrow, t.itemsCenter, t.justifyCenter]}>
              <View
                style={[
                  t.flexRow,
                  t.flexWrap,
                  t.justifyBetween,
                  t.itemsCenter,
                ]}>
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
            </View>
          </View>
          <View style={[t.wFull, t.mB10]}>
            <Button
              active
              loading={loading}
              type="success"
              title="Enviar"
              onPress={() => {
                handleSavePoint(pointStats);
              }}
            />
          </View>
        </Animated.View>
      )}

      <HDivider style={[t.mB2]} />
      <View
        style={[
          t.flexGrow,
          t.flexRow,
          t.flexWrap,
          t.justifyBetween,
          t.z50,
          t.pX2,
        ]}>
        <PointType
          areas={areas}
          mainColor="info"
          active={isTypePointActive(FONDO_DERECHA)}
          onPress={() => handlePressTypePoint(FONDO_DERECHA)}>
          Fondo Derecha
        </PointType>
        <PointType
          areas={areas}
          mainColor="info"
          active={isTypePointActive(FONDO_REVES)}
          onPress={() => handlePressTypePoint(FONDO_REVES)}>
          Fondo Revés
        </PointType>
        <PointType
          areas={areas}
          mainColor="warning"
          active={isTypePointActive(VOLEA_DERECHA)}
          onPress={() => handlePressTypePoint(VOLEA_DERECHA)}>
          Volea Derecha
        </PointType>
        <PointType
          areas={areas}
          mainColor="warning"
          active={isTypePointActive(VOLEA_REVES)}
          onPress={() => handlePressTypePoint(VOLEA_REVES)}>
          Volea Revés
        </PointType>
        <PointType
          areas={areas}
          mainColor="error"
          active={isTypePointActive(BAJADA_DERECHA)}
          onPress={() => handlePressTypePoint(BAJADA_DERECHA)}>
          Bajada Derecha
        </PointType>
        <PointType
          areas={areas}
          mainColor="error"
          active={isTypePointActive(BAJADA_REVES)}
          onPress={() => handlePressTypePoint(BAJADA_REVES)}>
          Bajada Revés
        </PointType>
        <PointType
          areas={areas}
          mainColor="primary"
          active={isTypePointActive(BANDEJA)}
          onPress={() => handlePressTypePoint(BANDEJA)}>
          Bandeja
        </PointType>
        <PointType
          areas={areas}
          mainColor="secondary"
          active={isTypePointActive(SMASH)}
          onPress={() => handlePressTypePoint(SMASH)}>
          Smash
        </PointType>
        <PointType
          areas={areas}
          mainColor="success"
          active={isTypePointActive(GLOBO)}
          onPress={() => handlePressTypePoint(GLOBO)}>
          Globo
        </PointType>
        <View
          onLayout={({nativeEvent}) =>
            setAreas({...areas, area1: {...nativeEvent.layout, name: 'area1'}})
          }
          style={[
            t.flex,
            t.justifyCenter,
            t.itemsCenter,
            t.absolute,
            t.w28,
            t.h40,

            {borderWidth: 2},
            {top: Dimensions.get('window').height / 4.1},
            {left: Dimensions.get('window').width / 4.6},
          ]}>
          <View>
            <CircleChart
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM1,
                match?.t1?.[0].id,
              )}>
              <Avatar
                onPress={() => {
                  handlePressWinPointTeam(TEAM1);
                  handlePressPlayer(match?.t1?.[0], TEAM1);
                  setModalOpen(true);
                }}
                active={isPlayerActive(match?.t1?.[0])}
                img={match?.t1?.[0].profileImg}
                imageStyle={[
                  t.border1,
                  t.borderWhite,
                  t.roundedFull,
                  t.shadow,
                  styles.avatarSizes,
                ]}
              />
            </CircleChart>
          </View>
        </View>
        <View
          onLayout={({nativeEvent}) =>
            setAreas({...areas, area2: {...nativeEvent.layout, name: 'area2'}})
          }
          style={[
            t.absolute,
            t.w28,
            t.h40,
            t.bgInfo,
            t.border1,
            {top: Dimensions.get('window').height / 4.1},
            {left: Dimensions.get('window').width / 1.95},
          ]}
        />
        <View
          onLayout={({nativeEvent}) =>
            setAreas({...areas, area3: {...nativeEvent.layout, name: 'area3'}})
          }
          style={[
            t.absolute,
            t.w28,
            t.h40,
            t.bgError,
            t.border1,
            {top: Dimensions.get('window').height / 2.3},
            {left: Dimensions.get('window').width / 4.6},
          ]}
        />
        <View
          onLayout={({nativeEvent}) =>
            setAreas({...areas, area4: {...nativeEvent.layout, name: 'area4'}})
          }
          style={[
            t.absolute,
            t.w28,
            t.h40,
            t.bgSuccess,
            t.border1,
            {top: Dimensions.get('window').height / 2.3},
            {left: Dimensions.get('window').width / 1.95},
          ]}
        />
        {/* {match?.t1?.map((player: PlayerType, i: number) => (
          <Avatar
            onPress={() => {
              handlePressWinPointTeam(TEAM1);
              handlePressPlayer(player, TEAM1);
              setModalOpen(true);
            }}
            active={isPlayerActive(player)}
            img={player?.profileImg}
            imageStyle={[
              t.border1,
              t.borderWhite,
              t.roundedFull,
              t.shadow,
              styles.avatarSizes,
            ]}
          />
        ))} */}
      </View>
      <View
        style={[
          t.justifyCenter,
          t.flexGrow,
          t.z10,
          t.absolute,
          t.wFull,
          t.hFull,
          t.pT40,
          t.pB10,
        ]}>
        <FastImage
          style={[t.flex1]}
          source={{
            uri: 'https://res.cloudinary.com/enalbis/image/upload/v1659947162/PadelPro/varios/nz8dcrhjrtry8kizlu4h.jpg',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      {/* <View
        style={[
          t.absolute,
          t.flexRow,
          t.top28,
          t.itemsCenter,
          t.justifyAround,
          t.wFull,
          t.pX20,
          t.z20,
        ]}>
        {match?.t2?.map((player: PlayerType, i: number) => (
          <View key={`${player?.id}-${i}`}>
            <CircleChart
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM2,
                player?.id,
              )}
            />
            <Avatar
              onPress={() => {
                handlePressWinPointTeam(TEAM2);
                handlePressPlayer(player, TEAM2);
                setModalOpen(true);
              }}
              active={isPlayerActive(player)}
              img={player?.profileImg}
              imageStyle={[
                t.border1,
                t.borderWhite,
                t.roundedFull,
                t.shadow,
                t.absolute,
                styles.avatarSizes,
              ]}
            />
          </View>
        ))}
      </View> */}
      {/* <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={[t.flex1, t.flexGrow]}>
        <View
          style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mY5, t.pX4]}>
          <LiveResult game={match?.game} />
          {match?.game?.finished ? (
            <Chip text="Finalizado" mainColor="error" />
          ) : (
            <Chip text="Activo" />
          )}
        </View>
        <HDivider />
        <View style={[t.mB5, t.mT5, t.pX4]}>
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
        <View style={[t.mB5, t.pX4]}>
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
        <View style={[t.mB5, t.pX4]}>
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
        <View style={[t.mB5, t.pX4]}>
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

      </KeyboardAwareScrollView>
      <HDivider />
      <View style={[t.pX4]}>
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
      </View> */}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  modalPoints: {
    borderWidth: 2,
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    top: '50%',
    left: '50%',
    marginTop: -MODAL_HEIGHT / 2,
    marginLeft: -MODAL_WIDTH / 2,
  },
  avatarSizes: {width: 68, height: 68},
});
