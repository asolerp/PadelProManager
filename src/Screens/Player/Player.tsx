import React from 'react';

import {ScrollView, View, Text, processColor} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';
import {Avatar as PlayerAvatar} from '../../Components/UI/Avatar';
import t from '../../Theme/theme';
import {MatchResume} from '../../Components/Home/MatchResume';

import {useGetPlayer} from './hooks/useGetPlayer';
import {Header} from '../../Components/Layout/Header';
import {legend, xAxis} from '../../Utils/graphParams';
import {ResumenStatistic} from '../../Components/Match/ResumenStatistic';
import {FlatList} from 'react-native-gesture-handler';
import {useGetMatches} from '../../Hooks/useGetMatches';

export const PLAYER_SCREEN_KEY = 'playerScreen';

export const PlayerScreen = ({route}) => {
  const {playerId} = route.params;
  const {player, tw, tl, tm, graphData, loading, error} =
    useGetPlayer(playerId);
  const {matches} = useGetMatches(playerId);
  const renderItem = ({item}) => <MatchResume match={item} />;

  return (
    <ScreenLayout edges={['top', 'left', 'right', 'bottom']}>
      <Header withBack title={player?.firstName + ' ' + player?.secondName} />

      <FlatList
        ListHeaderComponent={
          <>
            <View style={[t.mT10]}>
              <View style={[t.justifyCenter, t.itemsCenter]}>
                <PlayerAvatar
                  img={player?.profileImg}
                  imageStyle={[t.w28, t.h28]}
                />
                <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
                  <Stat label="Jugados" count={tm} />
                  <Stat label="Ganados" count={tw} />
                  <Stat label="Perdidos" count={tl} />
                </View>
              </View>
              <View style={[t.itemsCenter, t.mT1]}>
                {!loading && (
                  <>
                    <RadarChart
                      style={[
                        t.itemsCenter,
                        t.justifyCenter,
                        {width: 300, height: 300},
                      ]}
                      data={graphData}
                      xAxis={xAxis}
                      yAxis={{drawLabels: false}}
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
                    <View>
                      <ResumenStatistic statistics={graphData?.dataSets} />
                    </View>
                  </>
                )}
              </View>
              <View style={[t.mT5]}>
                <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
                  Últimos partidos
                </Text>
                <View />
              </View>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        data={matches}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScreenLayout>
  );
};
