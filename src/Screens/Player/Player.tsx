import React, {useState, useEffect} from 'react';

import {ScrollView, View, Text, processColor} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';
import {Avatar as PlayerAvatar} from '../../Components/UI/Avatar';
import t from '../../Theme/theme';
import {MatchResume} from '../../Components/Home/MatchResume';
import {matches} from '../../Mocks/matches';
import {useGetPlayer} from './hooks/useGetPlayer';
import {Header} from '../../Components/Layout/Header';
import {legend, xAxis} from '../../Utils/graphParams';

export const PLAYER_SCREEN_KEY = 'playerScreen';

export const PlayerScreen = ({route}) => {
  const {playerId} = route.params;
  const {player, tw, tl, tm, graphData, loading, error} =
    useGetPlayer(playerId);

  return (
    <ScreenLayout>
      <Header withBack title={player?.firstName + ' ' + player?.secondName} />
      <ScrollView style={[t.mT7]} showsVerticalScrollIndicator={false}>
        <View style={[t.justifyCenter, t.itemsCenter]}>
          <PlayerAvatar img={player?.profileImg} imageStyle={[t.w28, t.h28]} />
          <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
            <Stat label="Jugados" count={tm} />
            <Stat label="Ganados" count={tw} />
            <Stat label="Perdidos" count={tl} />
          </View>
        </View>
        <View style={[t.itemsCenter, t.mT1]}>
          {!loading && (
            <RadarChart
              style={[
                t.itemsCenter,
                t.justifyCenter,
                {width: 300, height: 300},
              ]}
              data={graphData}
              xAxis={xAxis}
              yAxis={{drawLabels: true}}
              chartDescription={{text: ''}}
              legend={legend}
              drawWeb={true}
              webLineWidth={1}
              webLineWidthInner={1}
              webAlpha={255}
              webColorInner={processColor('#cbd5e0')}
              skipWebLineCount={1}
              touchEnabled={false}
            />
          )}
        </View>
        <View>
          <Text style={[t.textLg, t.fontSansMedium, t.mB3]}>
            Últimos partidos
          </Text>
          <View />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
