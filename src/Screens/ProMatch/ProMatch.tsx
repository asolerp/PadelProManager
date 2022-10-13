import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {PlayerRadarGraph} from '../../Components/Common/PlayerRadarGraph';

import {Header, ScreenLayout} from '../../Components/Layout';
import {useStatistics} from '../../Components/Match/hooks/useStatistics';
import {ResultPro} from '../../Components/PadelPro/ResultPro';
import {StatsPro} from '../../Components/PadelPro/StatsPro';
import t from '../../Theme/theme';

export const PRO_MATCH_SCREEN_KEY = 'proMatchScreen';

export const ProMatch = ({route}) => {
  const {match} = route.params;

  const {
    dataP1,
    dataP2,
    dataP3,
    dataP4,
    tableP1,
    tableP2,
    tableP3,
    tableP4,
    matchStatistics,
    dataGenerated,
  } = useStatistics({
    team1: match?.t1,
    team2: match?.t2,
    statistics: match?.statistics,
    mode: 'white',
  });

  return (
    <ImageBackground
      style={[t.flexGrow]}
      resizeMode="stretch"
      source={{
        uri: 'https://res.cloudinary.com/enalbis/image/upload/v1662134698/PadelPro/varios/mia8e5e2lx6l3vwpa3be.jpg',
      }}>
      <ScreenLayout mode="transparent">
        <Header
          withBack
          mode="dark"
          title={match?.tournamentName.toUpperCase()}
        />
        <View style={[t.flex1]}>
          <ScrollView
            style={[t.pX4, t.mT4]}
            showsVerticalScrollIndicator={false}>
            <ResultPro
              round={match.round}
              game={match?.game}
              t1={match?.t1}
              t2={match?.t2}
            />
            <View style={[t.mT7]} />
            <Text style={[t.fontSansBold, t.textWhite, t.textLg]}>
              RESUMEN DEL PARTIDO
            </Text>
            <View style={[t.mT2]} />
            {dataGenerated ? (
              <>
                <StatsPro matchStatistics={matchStatistics} />
                <View style={[t.mT7, t.justifyCenter, t.itemsCenter]}>
                  {dataP1 && match?.t1?.[0] && (
                    <PlayerRadarGraph
                      withBlur
                      mode="white"
                      player={match?.t1?.[0]}
                      data={dataP1}
                      table={tableP1}
                    />
                  )}
                  {dataP2 && match?.t1?.[1] && (
                    <PlayerRadarGraph
                      withBlur
                      mode="white"
                      player={match?.t1?.[1]}
                      data={dataP2}
                      table={tableP2}
                    />
                  )}
                  {dataP3 && match?.t2?.[0] && (
                    <PlayerRadarGraph
                      withBlur
                      mode="white"
                      player={match?.t2?.[0]}
                      data={dataP3}
                      table={tableP3}
                    />
                  )}
                  {dataP4 && match?.t2?.[1] && (
                    <PlayerRadarGraph
                      withBlur
                      mode="white"
                      player={match?.t2?.[1]}
                      data={dataP4}
                      table={tableP4}
                    />
                  )}
                </View>
              </>
            ) : (
              <ActivityIndicator color="white" style={[t.mT3]} />
            )}
          </ScrollView>
        </View>
      </ScreenLayout>
    </ImageBackground>
  );
};
