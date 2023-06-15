import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ImageBackground, Text, View} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {useLiveMatch} from '../../Components/Match/hooks/useLiveMatch';
import {useStatistics} from '../../Components/Match/hooks/useStatistics';
import {ResultPro} from '../../Components/PadelPro/ResultPro';
import {SetSelector} from '../../Components/PadelPro/SetSelector';
import {StatsPro} from '../../Components/PadelPro/StatsPro';
import {Button} from '../../Components/UI/Button';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import t from '../../Theme/theme';
import {useGetMatch} from '../Match/hooks/useGetMatch';
import {useNewPoint} from '../NewPoint/hooks/useNewPoint';
import {useRestorePoint} from '../NewPoint/hooks/useRestorePoint';
import {getPoints} from '../NewPoint/utils/getPoints';

export const NEW_SIMPLE_POINT_SCREEN_KEY = 'newSimplePointScreen';

export const NewSimplePoint = ({route}) => {
  const {matchId} = route?.params;
  const {match} = useGetMatch(matchId);
  const [points, setPoints] = useState();

  const {handleSavePoint: onSavePoint, loading} = useLiveMatch(match);
  const {matchStatistics, activeSet, handleSetActiveSet} = useStatistics({
    team1: match?.t1,
    team2: match?.t2,
    statistics: match?.statistics,
  });

  const {cleanNewPointForm, resultPoint} = useNewPoint();

  const {handleRestorePoint, loadingRestorePoint, lastState} =
    useRestorePoint(matchId);

  const handlePressTeam = team => {
    onSavePoint(
      {
        winPointTeam: team,
        points: [{info: ''}],
      },
      () => {},
    );
    cleanNewPointForm();
  };

  useEffect(() => {
    setPoints(getPoints(resultPoint));
  }, [resultPoint]);

  return (
    <ImageBackground
      style={[t.flexGrow]}
      resizeMode="stretch"
      source={{
        uri: 'https://res.cloudinary.com/enalbis/image/upload/v1666683667/PadelPro/varios/qx0n0xokjfivjub92jcz.jpg',
      }}>
      <ScreenLayout mode="transparent" edges={['top', 'bottom']}>
        <Header
          withBack
          mode="dark"
          title={match?.tournamentName?.toUpperCase()}
        />
        <View style={[t.flex1, t.pX4]}>
          <ResultPro
            withServcice
            round={match?.round}
            game={match?.game}
            t1={match?.t1}
            t2={match?.t2}
          />
          <View style={[t.mT7]} />
          <Text style={[t.fontSansBold, t.textWhite, t.textLg]}>
            RESUMEN DEL PARTIDO
          </Text>

          <View style={[t.mT7]} />
          <SetSelector
            activeSet={activeSet}
            handleActiveSet={handleSetActiveSet}
          />
          <View style={[t.mT7]} />
          <StatsPro
            matchStatistics={matchStatistics}
            goldPoint={match?.game?.goldPoint}
          />
          <View style={[t.flexGrow, t.flexRow, t.itemsCenter, t.justifyAround]}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <PressableOpacity
                  onPress={() => handlePressTeam('team1')}
                  style={[
                    t.w32,
                    t.h32,
                    t.shadow,
                    t.bgWarningDark,
                    t.justifyCenter,
                    t.itemsCenter,
                    t.roundedFull,
                  ]}>
                  <Text style={[t.textCenter, t.fontSansBold, t.textWhite]}>
                    Ganan el punto {match?.t1?.[0]?.secondName} &{' '}
                    {match?.t1?.[1]?.secondName}
                  </Text>
                </PressableOpacity>
                <PressableOpacity
                  onPress={() => handlePressTeam('team2')}
                  style={[
                    t.w32,
                    t.h32,
                    t.shadow,
                    t.bgWarningDark,
                    t.justifyCenter,
                    t.itemsCenter,
                    t.roundedFull,
                  ]}>
                  <Text style={[t.textCenter, t.fontSansBold, t.textWhite]}>
                    Ganan el punto {match?.t2?.[0]?.secondName} &{' '}
                    {match?.t2?.[1]?.secondName}
                  </Text>
                </PressableOpacity>
              </>
            )}
          </View>
          <View>
            <Button
              disabled={!lastState}
              loading={loadingRestorePoint}
              title="Restablecer punto"
              style={[t.h10]}
              onPress={() => {
                handleRestorePoint();
              }}
            />
          </View>
        </View>
      </ScreenLayout>
    </ImageBackground>
  );
};
