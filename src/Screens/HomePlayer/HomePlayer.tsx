import React from 'react';

import {View, Text, processColor, ScrollView} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';

import t from '../../Theme/theme';
import {MatchResume} from '../../Components/Home/MatchResume';

import {useGetPlayer} from './hooks/useGetPlayer';

import {legend, xAxis} from '../../Utils/graphParams';
import {ResumenStatistic} from '../../Components/Match/ResumenStatistic';

import {useGetPlayerMatches} from '../../Hooks/useGetPlayerMatches';

import {PlayerHeader} from '../../Components/HomePlayer/PlayerHeader';
import {usePermissions} from '../../Hooks/usePermissions';
import {PlayerLiveMatches} from '../../Components/Player/PlayerLiveMatches';
import {WelcomeMessage} from '../../Components/Home/WelcomeMessage';
import {Banner} from '../../Components/UI/Banner';

export const HOME_PLAYER_SCREEN_KEY = 'playerScreen';

export const HomePlayerScreen = () => {
  const {player, tw, tl, tm, graphData, loading} = useGetPlayer();

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PlayerHeader playerId={player?.id} />

        {!player?.coach && (
          <Banner
            mainColor="warning"
            onPress={() => {}}
            ctaText="INFORMAR ENTRENADOR"
            title="Avisa a tu entrenador"
            subtitle="Hazle saber a tu entrenador de PadelPro para que pueda llevar un seguimiento de tus logros y tu evolución."
          />
        )}
        <View style={[t.mT5]}>
          <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
            Mis estadísticas
          </Text>
          <View style={[t.itemsCenter]}>
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
                <View>
                  <ResumenStatistic statistics={graphData?.dataSets} />
                </View>
              </>
            )}
          </View>
          <View style={[t.mT5, t.mB5]}>
            <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
              Partidos activos
            </Text>
            {player?.id && <PlayerLiveMatches playerId={player?.id} />}
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
