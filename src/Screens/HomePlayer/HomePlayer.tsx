import React, {useContext} from 'react';

import {View, Text, ScrollView} from 'react-native';
import {RadarChart} from '../../Components/Common/RadarChart';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';

import t from '../../Theme/theme';

import {useGetPlayer} from './hooks/useGetPlayer';

import {ResumenStatistic} from '../../Components/Match/ResumenStatistic';
import {MyTodaySessions} from '../../Components/Home/MyTodaySessions';

import {PlayerHeader} from '../../Components/HomePlayer/PlayerHeader';

import {PlayerLiveMatches} from '../../Components/Player/PlayerLiveMatches';

import {Banner} from '../../Components/UI/Banner';
import {AuthContext} from '../../Context/AuthContex';
import {PendingRelationModal} from '../../Components/HomePlayer/PendingRelationModal';
import {useCheckPendingRelation} from './hooks/useCheckPendingRelation';
import {useShareApp} from './hooks/useShareApp';
import {useHideBootSplash} from '../../Hooks/useHideBootSplash';

export const HOME_PLAYER_SCREEN_KEY = 'playerScreen';

export const HomePlayerScreen = () => {
  const {user} = useContext(AuthContext);
  const {tw, tl, tm, graphData} = useGetPlayer();
  const {pendingRelation} = useCheckPendingRelation();
  const {handleShare} = useShareApp();

  useHideBootSplash();

  return (
    <ScreenLayout>
      <PendingRelationModal relations={pendingRelation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PlayerHeader />
        <View style={[t.mB5, t.pX4]}>
          <MyTodaySessions />
        </View>
        {!user?.coachId && (
          <Banner
            mainColor="warning"
            onPress={() => handleShare()}
            ctaText="INFORMAR ENTRENADOR"
            title="Avisa a tu entrenador"
            subtitle="Hazle saber a tu entrenador de PadelPro para que pueda llevar un seguimiento de tus logros y tu evolución."
          />
        )}
        <View style={[t.mT5, t.pX4]}>
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
            {graphData && (
              <>
                <RadarChart
                  captions={graphData?.captions}
                  data={graphData?.chart}
                  options={graphData?.options}
                  size={graphData?.size}
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
            <PlayerLiveMatches userEmail={user?.email} />
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
