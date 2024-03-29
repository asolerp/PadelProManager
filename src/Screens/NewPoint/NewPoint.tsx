import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {View, StyleSheet, Text, Dimensions, Pressable} from 'react-native';

import t from '../../Theme/theme';

import {Avatar} from '../../Components/UI/Avatar';
import {Button} from '../../Components/UI/Button';
import {Chip} from '../../Components/UI/Chip';
import {useNewPoint} from './hooks/useNewPoint';
import {PointType} from '../../Components/NewPoint/PointType';
import {showError} from './utils/alertErrorMessages';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {
  ERROR_FORCED,
  NONFORCED,
  TEAM1,
  TEAM2,
  WINNER,
} from '../../Utils/constants';

import {LiveResult} from '../../Components/Match/LiveResult';
import {HDivider} from '../../Components/UI/HDivider';
import {useLiveMatch} from '../../Components/Match/hooks/useLiveMatch';
import {useGetMatch} from '../Match/hooks/useGetMatch';

import {CircleChart} from '../../Components/Match/CircleChart';

import {Header} from '../../Components/Layout';
import {getPoints} from './utils/getPoints';
import {PointMask} from '../../Components/NewPoint/PointMask';
import {shortName} from '../../Utils/parsers';

import {useWalkthroughSteps} from './hooks/useWalkthroughSteps';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useRestorePoint} from './hooks/useRestorePoint';
import {getTotalPlayerStatistics} from './utils/getTotalPointsPlayer';

export const NEW_POINT_SCREEN_KEY = 'newPoint';
const MODAL_WIDTH = 340;
const MODAL_HEIGHT = 500;

export const NewPoint = ({route}) => {
  const {matchId} = route?.params;
  const [areas, setAreas] = useState({});
  const {match} = useGetMatch(matchId);
  const [points, setPoints] = useState();
  const {handleSavePoint: onSavePoint, loading} = useLiveMatch(match);

  const {
    usedPoints,
    pointStats,
    resultPoint,
    winPointTeam,
    handleOnDrop,
    isResultActive,
    isPlayerActive,
    hasSavePointError,
    handlePressResult,
    cleanNewPointForm,
    checkIfIsInPointStats,
    isPointWithoutStatistic,
    handlePressWinPointTeam,
  } = useNewPoint();

  const {handleRestorePoint, loadingRestorePoint, lastState} =
    useRestorePoint(matchId);

  const {
    start,
    stepOneOnLayout,
    stepTwoOnLayout,
    stepThirdOnLayout,
    stepFourthOnLayout,
  } = useWalkthroughSteps(true);

  const handlerSavePoint = point => {
    onSavePoint(point, () => {});
    cleanNewPointForm();
  };

  const handleSavePoint = point => {
    if (hasSavePointError) {
      return showError.no_team();
    }
    if (isPointWithoutStatistic) {
      return handlerSavePoint({
        winPointTeam,
        points: [{info: ''}],
      });
    } else {
      return handlerSavePoint({points: point, winPointTeam});
    }
  };

  useEffect(() => {
    setPoints(getPoints(resultPoint));
  }, [resultPoint]);

  return (
    <ScreenLayout>
      <Header
        containerStyle={[t.bgWhite]}
        withBack
        title={<LiveResult game={match?.game} />}
        rightSide={
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mY5]}>
            {match?.game?.finished ? (
              <Chip text="Finalizado" mainColor="error" />
            ) : (
              <Chip text="Activo" />
            )}
          </View>
        }
      />
      <PressableOpacity
        onPress={start}
        style={[t.absolute, t.z50, {top: 85, right: 10}]}>
        <Icon
          name="ios-information-circle-outline"
          color={t.bgWhite.backgroundColor}
          size={30}
        />
      </PressableOpacity>
      <View
        onLayout={stepThirdOnLayout}
        style={[
          t.h10,
          t.w10,
          t.z50,
          {top: Dimensions.get('window').height / 2.4},
          t.absolute,
          t.left3,
          t.bottom0,
          t.justifyCenter,
          t.itemsCenter,
        ]}>
        <Pressable
          style={[
            t.w10,
            t.h10,
            t.roundedFull,
            t.justifyCenter,
            t.itemsCenter,
            winPointTeam === TEAM1 ? t.bgSuccessDark : t.bgGray400,
            t.shadow,
          ]}
          onPress={() => handlePressWinPointTeam(TEAM1)}>
          <Text style={[t.textWhite, t.fontSansBold]}>T1</Text>
        </Pressable>
      </View>
      <View
        style={[
          t.h10,
          t.w10,
          t.z50,
          {bottom: Dimensions.get('window').height / 3.5},
          t.absolute,
          t.left3,
          t.justifyCenter,
          t.itemsCenter,
        ]}>
        <Pressable
          style={[
            t.w10,
            t.h10,
            t.roundedFull,
            t.justifyCenter,
            t.itemsCenter,
            winPointTeam === TEAM2 ? t.bgSuccessDark : t.bgGray400,
            t.shadow,
          ]}
          onPress={() => handlePressWinPointTeam(TEAM2)}>
          <Text style={[t.textWhite, t.fontSansBold]}>T2</Text>
        </Pressable>
      </View>
      <View
        style={[
          t.w10,
          t.h10,
          t.z50,
          t.absolute,
          t.right3,
          {top: Dimensions.get('window').height / 1.9},
          t.bottom0,
          t.justifyCenter,
          t.itemsCenter,
        ]}>
        <Pressable
          style={[
            t.w10,
            t.h10,
            t.roundedFull,
            t.justifyCenter,
            t.itemsCenter,
            t.bgErrorDark,
            t.shadow,
          ]}
          onPress={() => cleanNewPointForm()}>
          <Icon name="trash" color="white" size={20} />
        </Pressable>
      </View>
      <View
        onLayout={stepFourthOnLayout}
        style={[
          t.absolute,
          t.left0,
          t.p2,
          t.right0,
          t.z50,
          t.bottom20,
          t.justifyCenter,
          t.itemsCenter,
        ]}>
        <Button
          loading={loading}
          title="ENVIAR"
          active
          type="success"
          size="md"
          style={[t.w32]}
          onPress={() => {
            handleSavePoint(pointStats);
          }}
        />
      </View>
      <View
        onLayout={stepFourthOnLayout}
        style={[
          t.absolute,
          t.left0,
          t.p2,
          t.right0,
          t.z50,
          t.bottom10,
          t.justifyCenter,
          t.itemsCenter,
        ]}>
        <Button
          disabled={!lastState}
          loading={loadingRestorePoint}
          title="Eliminar punto"
          size="xs"
          active
          onPress={() => {
            handleRestorePoint();
          }}
        />
      </View>
      <HDivider style={[t.mB2]} />
      <View
        style={[t.flexRow, t.mY4, t.justifyCenter, t.z50, t.p2]}
        onLayout={stepOneOnLayout}>
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
      <View
        style={[
          t.flexGrow,
          t.flexRow,
          t.flexWrap,
          t.justifyCenter,
          t.z40,
          t.pX2,
          t.shadowNone,
        ]}>
        <View
          onLayout={stepTwoOnLayout}
          style={[
            t.flexGrow,
            t.flexRow,
            t.flexWrap,
            t.justifyCenter,
            t.p2,
            t.z50,
            t.roundedSm,
            t.shadowNone,
          ]}>
          {points?.map(p => (
            <PointType
              key={`${p.type}-${p.label}`}
              result={resultPoint}
              usedPoints={usedPoints}
              onDrop={area => {
                handleOnDrop({area, match, point: p});
              }}
              areas={areas}
              mainColor={p.mainColor}
              type={p.type}
              match={match}>
              {p.label}
            </PointType>
          ))}
        </View>
        <View
          onLayout={({nativeEvent}) => {
            setAreas(old => ({
              ...old,
              area1: {
                ...nativeEvent.layout,
                name: 1,
                id: match?.t1?.[0].id,
              },
            }));
          }}
          style={[
            t.flex,
            t.justifyCenter,
            t.itemsCenter,
            t.absolute,
            t.w28,
            t.h36,
            {top: Dimensions.get('window').height / 5.4},
            {left: Dimensions.get('window').width / 4.6},
          ]}>
          <View>
            <CircleChart
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM1,
                match?.t1?.[0].id,
              )}>
              {checkIfIsInPointStats(match?.t1?.[0].id) ? (
                <PointMask
                  usedPoints={usedPoints}
                  playerId={match?.t1?.[0]?.id}
                />
              ) : (
                <Avatar
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
              )}
            </CircleChart>
            <View
              style={[
                t.p1,
                t.bgGray100,
                t.mX2,
                t.mT2,
                t.roundedSm,
                t.itemsCenter,
              ]}>
              <Text
                style={[t.alignCenter]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {shortName(
                  1,
                  match?.t1?.[0]?.firstName,
                  match?.t1?.[0]?.secondName,
                )}
              </Text>
            </View>
          </View>
        </View>
        <View
          onLayout={({nativeEvent}) =>
            setAreas({
              ...areas,
              area2: {...nativeEvent.layout, name: 2, id: match?.t1?.[1].id},
            })
          }
          style={[
            t.flex,
            t.justifyCenter,
            t.itemsCenter,
            t.absolute,
            t.w28,
            t.h36,
            {top: Dimensions.get('window').height / 5.4},
            {left: Dimensions.get('window').width / 1.98},
          ]}>
          <View>
            <CircleChart
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM1,
                match?.t1?.[1].id,
              )}>
              {checkIfIsInPointStats(match?.t1?.[1].id) ? (
                <PointMask
                  usedPoints={usedPoints}
                  playerId={match?.t1?.[1]?.id}
                />
              ) : (
                <Avatar
                  active={isPlayerActive(match?.t1?.[1])}
                  img={match?.t1?.[1].profileImg}
                  imageStyle={[
                    t.border1,
                    t.borderWhite,
                    t.roundedFull,
                    t.shadow,
                    styles.avatarSizes,
                  ]}
                />
              )}
            </CircleChart>
            <View
              style={[
                t.p1,
                t.bgGray200,
                t.mX2,
                t.mT2,
                t.roundedSm,
                t.itemsCenter,
              ]}>
              <Text
                style={[t.alignCenter]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {shortName(
                  2,
                  match?.t1?.[1]?.firstName,
                  match?.t1?.[1]?.secondName,
                )}
              </Text>
            </View>
          </View>
        </View>
        <View
          onLayout={({nativeEvent}) =>
            setAreas({
              ...areas,
              area3: {...nativeEvent.layout, name: 3, id: match?.t2?.[0].id},
            })
          }
          style={[
            t.flex,
            t.justifyCenter,
            t.itemsCenter,
            t.absolute,
            t.w28,
            t.h36,
            {top: Dimensions.get('window').height / 2.82},
            {left: Dimensions.get('window').width / 4.6},
          ]}>
          <View>
            <CircleChart
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM2,
                match?.t2?.[0].id,
              )}>
              {checkIfIsInPointStats(match?.t2?.[0].id) ? (
                <PointMask
                  usedPoints={usedPoints}
                  playerId={match?.t2?.[0]?.id}
                />
              ) : (
                <Avatar
                  active={isPlayerActive(match?.t2?.[0])}
                  img={match?.t2?.[0].profileImg}
                  imageStyle={[
                    t.border1,
                    t.borderWhite,
                    t.roundedFull,
                    t.shadow,
                    styles.avatarSizes,
                  ]}
                />
              )}
            </CircleChart>
            <View
              style={[
                t.p1,
                t.bgGray100,
                t.mX2,
                t.mT2,
                t.roundedSm,
                t.itemsCenter,
              ]}>
              <Text
                style={[t.alignCenter]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {shortName(
                  3,
                  match?.t2?.[0]?.firstName,
                  match?.t2?.[0]?.secondName,
                )}
              </Text>
            </View>
          </View>
        </View>
        <View
          onLayout={({nativeEvent}) =>
            setAreas({
              ...areas,
              area4: {...nativeEvent.layout, name: 4, id: match?.t2?.[1].id},
            })
          }
          style={[
            t.flex,
            t.justifyCenter,
            t.itemsCenter,
            t.absolute,
            t.w28,
            t.h36,
            {top: Dimensions.get('window').height / 2.82},
            {left: Dimensions.get('window').width / 1.98},
          ]}>
          <View>
            <CircleChart
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM2,
                match?.t2?.[1].id,
              )}>
              {checkIfIsInPointStats(match?.t2?.[1].id) ? (
                <PointMask
                  usedPoints={usedPoints}
                  playerId={match?.t2?.[1]?.id}
                />
              ) : (
                <Avatar
                  active={isPlayerActive(match?.t1?.[0])}
                  img={match?.t2?.[1].profileImg}
                  imageStyle={[
                    t.border1,
                    t.borderWhite,
                    t.roundedFull,
                    t.shadow,
                    styles.avatarSizes,
                  ]}
                />
              )}
            </CircleChart>
            <View
              style={[
                t.p1,
                t.bgGray100,
                t.mX2,
                t.mT2,
                t.roundedSm,
                t.itemsCenter,
              ]}>
              <Text
                style={[t.alignCenter]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {shortName(
                  4,
                  match?.t2?.[1]?.firstName,
                  match?.t2?.[1]?.secondName,
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          {backgroundColor: '#FF5B42'},
          t.justifyEnd,
          t.flexGrow,
          t.absolute,
          t.wFull,
          t.hFull,
          t.pB10,
        ]}>
        <FastImage
          style={[
            t.opacity80,
            {height: Dimensions.get('window').height / 1.55},
          ]}
          source={{
            uri: 'https://res.cloudinary.com/enalbis/image/upload/v1662639963/PadelPro/varios/yqw1nnxl95jlvfzkb2fp.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
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
