import React from 'react';
import {ImageBackground, View, Text, ScrollView} from 'react-native';

import {RadarChart} from '../../Components/Common/RadarChart';
import {Header, ScreenLayout} from '../../Components/Layout';
import {useStatistics} from '../../Components/Match/hooks/useStatistics';
import {ResultPro} from '../../Components/PadelPro/ResultPro';
import {StatsPro} from '../../Components/PadelPro/StatsPro';
import t from '../../Theme/theme';

import data from './demoData';

export const PRO_MATCH_SCREEN_KEY = 'proMatchScreen';

const DARK_BLUE = '#21336B';

export const ProMatch = ({route}) => {
  const {match} = route.params;

  const {
    dataP1,
    dataP2,
    dataP3,
    dataP4,
    t1Tbj,
    t2Tbj,
    t1Tsm,
    t2Tsm,
    t1Tbp,
    t2Tbp,
    t1GP,
    t2GP,
    t1Tf,
    t2Tf,
    t1Tw,
    t2Tw,
    t1Tnf,
    t2Tnf,
    t1Tef,
    t2Tef,
    t1Tv,
    t2Tv,
    activeSet,
    totalPoints,
    totalGoldPoints,
    totalWPerPlayer,
    totalEFPerPlayer,
    totalNFPerPlayer,
    handleSetActiveSet,
  } = useStatistics({
    team1: match?.t1,
    team2: match?.t2,
    statistics: match?.statistics,
  });

  return (
    <ImageBackground
      style={[t.flexGrow]}
      resizeMode="stretch"
      source={{
        uri: 'https://res.cloudinary.com/enalbis/image/upload/v1662134698/PadelPro/varios/mia8e5e2lx6l3vwpa3be.jpg',
      }}>
      <ScreenLayout mode="transparent">
        <Header withBack mode="dark" title="ED VALÈNCIA OPEN " />
        <View style={[t.flex1]}>
          <ScrollView
            style={[t.pX4, t.mT4]}
            showsVerticalScrollIndicator={false}>
            <ResultPro />
            <View style={[t.mT7]} />
            <Text style={[t.fontSansBold, t.textWhite, t.textLg]}>
              RESUMEN DEL PARTIDO
            </Text>
            <View style={[t.mT2]} />
            <StatsPro />
            <View style={[t.mT7, t.justifyCenter, t.itemsCenter]}>
              <RadarChart
                captions={data?.captions}
                data={data?.chart}
                options={data?.options}
                size={data?.size}
              />
              {/* {dataP1 && match?.t1?.[0] && (
                <PlayerRadarGraph
                  mode="white"
                  player={match?.t1?.[0]}
                  data={dataP1}
                />
              )} */}
            </View>
          </ScrollView>
        </View>
      </ScreenLayout>
    </ImageBackground>
  );
};
