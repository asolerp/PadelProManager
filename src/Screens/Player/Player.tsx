import React from 'react';

import {View, Text, FlatList, processColor} from 'react-native';
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

import {useGetMatches} from '../../Hooks/useGetMatches';
import {
  categoryParse,
  colorByCategory,
  colorByHand,
  handParse,
} from '../../Utils/parsers';
import {Chip} from '../../Components/UI/Chip';
import {PlayerSettings} from '../../Components/Player/PlayerSettings';

export const PLAYER_SCREEN_KEY = 'playerScreen';

export const PlayerScreen = ({route}) => {
  const {player, tw, tl, tm, graphData, loading} = useGetPlayer(
    route?.params?.playerId,
  );
  const {matches} = useGetMatches(player?.id);
  const renderItem = ({item}) => <MatchResume match={item} />;

  return (
    <ScreenLayout edges={['top', 'left', 'right', 'bottom']}>
      <Header
        withBack
        position="absolute"
        rightSide={<PlayerSettings playerId={player?.id} />}
      />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={[t.mT5]}>
              <View style={[t.justifyCenter, t.itemsCenter]}>
                <PlayerAvatar
                  img={player?.profileImg}
                  imageStyle={[t.w28, t.h28]}
                />
                <Text style={[t.fontSansBold, t.textLg, t.mT2]}>
                  {player?.firstName} {player?.secondName}
                </Text>
                <View style={[t.flexRow, t.itemsCenter, t.mT3]}>
                  <View style={[t.flexRow, t.itemsCenter, t.mR2]}>
                    <Text style={[t.fontSans, t.textXs, t.textGray800, t.mR1]}>
                      Categoría:
                    </Text>
                    {player?.category ? (
                      <Chip
                        mainColor={colorByCategory[player?.category || 3]}
                        text={`${categoryParse[player?.category || 3]}`}
                        style={[t.mR1]}
                      />
                    ) : (
                      <Chip
                        mainColor="error"
                        text="Sin definir"
                        style={[t.mR1]}
                      />
                    )}
                  </View>
                  <View style={[t.flexRow, t.itemsCenter]}>
                    <Text style={[t.fontSans, t.textXs, t.textGray800, t.mR1]}>
                      Mano:
                    </Text>
                    {player?.hand ? (
                      <Chip
                        mainColor={colorByHand[player?.hand || 'right']}
                        text={`${handParse[player?.hand || 'right']}`}
                      />
                    ) : (
                      <Chip
                        mainColor="error"
                        text="Sin definir"
                        style={[t.mR1]}
                      />
                    )}
                  </View>
                </View>
                <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
                  <Stat label="Jugados" count={tm} />
                  <Stat label="Ganados" count={tw} />
                  <Stat label="Perdidos" count={tl} />
                </View>
              </View>
              <View style={[t.itemsCenter]}>
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
                    <View style={[t.wFull]}>
                      <ResumenStatistic statistics={graphData?.dataSets} />
                    </View>
                  </>
                )}
              </View>
              <View style={[t.mT5]}>
                <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
                  Últimos partidos
                </Text>
                {matches?.length === 0 && (
                  <Text style={[t.fontSansMedium]}>
                    No hay partidas finalizadas
                  </Text>
                )}
                <View />
              </View>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        data={matches}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={[t.pX4]}
      />
    </ScreenLayout>
  );
};
