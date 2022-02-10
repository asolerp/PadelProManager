import React, {useContext} from 'react';

import {View, Text, processColor, ScrollView} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';
import {Avatar as PlayerAvatar} from '../../Components/UI/Avatar';
import t from '../../Theme/theme';
import {MatchResume} from '../../Components/Home/MatchResume';
import {AuthContext} from '../../Context/AuthContex';
import {useGetPlayer} from './hooks/useGetPlayer';

import {legend, xAxis} from '../../Utils/graphParams';
import {ResumenStatistic} from '../../Components/Match/ResumenStatistic';

import {useGetPlayerMatches} from '../../Hooks/useGetPlayerMatches';

import {PlayerHeader} from '../../Components/Player/PlayerHeader';
import {usePermissions} from '../../Hooks/usePermissions';
import {PlayerLiveMatches} from '../../Components/Player/PlayerLiveMatches';
import {WelcomeMessage} from '../../Components/Home/WelcomeMessage';

export const HOME_PLAYER_SCREEN_KEY = 'playerScreen';

export const HomePlayerScreen = ({route}) => {
  const {isCoach} = usePermissions();
  const {player, tw, tl, tm, graphData, loading} = useGetPlayer();
  const {matches} = useGetPlayerMatches();

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PlayerHeader position="absolute" playerId={player?.id} />
        <View style={[t.mT10]}>
          <WelcomeMessage />
        </View>
        <View style={[t.mT5]}>
          <View style={[t.itemsCenter]}>
            <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
              <Stat label="Jugados" count={tm} />
              <Stat label="Ganados" count={tw} />
              <Stat label="Perdidos" count={tl} />
            </View>
          </View>
          {/* <View style={[t.justifyCenter, t.itemsCenter]}>
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
                  <Chip mainColor="error" text="Sin definir" style={[t.mR1]} />
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
                  <Chip mainColor="error" text="Sin definir" style={[t.mR1]} />
                )}
              </View>
            </View>

          </View> */}
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
          {isCoach ? (
            <View style={[t.mT5]}>
              <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
                Últimos partidos
              </Text>
              {matches?.length === 0 ? (
                <Text style={[t.fontSansMedium]}>
                  No hay partidas finalizadas
                </Text>
              ) : (
                <>
                  {matches?.map(m => (
                    <MatchResume match={m} key={m?.id} />
                  ))}
                </>
              )}
              <View />
            </View>
          ) : (
            <View style={[t.mT5, t.mB5]}>
              <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
                Partidos activos
              </Text>
              {player?.id && <PlayerLiveMatches playerId={player?.id} />}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
