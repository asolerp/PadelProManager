import React, {FunctionComponent} from 'react';

import {ScreenLayout} from '../../Components/Layout';
import {View, Text, ScrollView, FlatList} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Common/LiveMatchResume';
import {MatchResume} from '../../Components/Home/MatchResume';

import {openScreenWithPush} from '../../Router/utils/actions';

import {MyPlayers} from '../../Components/Home/MyPlayers';

import {useGetLiveMatches} from '../../Hooks/useGetLiveMatches';
import {useGetFinishedMatches} from '../../Hooks/useGetFinishedMatches';

import {Banner} from '../../Components/UI/Banner';
import {NEW_MATCH_SCREEN_KEY} from '../NewMatch/NewMatch';

import {DailyExercise} from '../../Components/Home/DailyExercise';
import {sortByDate} from '../../Utils/sorts';

import {HomeHeader} from '../../Components/Home/HomeHeader';

import {MyTodaySessions} from '../../Components/Home/MyTodaySessions';
import {useHideBootSplash} from '../../Hooks/useHideBootSplash';

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
  useHideBootSplash();
  const {finishedMatches, loadingFinishedMatches} = useGetFinishedMatches();

  const {liveMatches} = useGetLiveMatches();

  const renderItem = ({item}) => <LiveMatchResume match={item} />;

  return (
    <ScreenLayout edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} style={[t.flex1, t.pX4]}>
        <HomeHeader />
        <View style={[t.mB7]}>
          <MyTodaySessions />
        </View>
        <View style={[t.mB7]}>
          <MyPlayers />
        </View>
        <View>
          <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
            Partidos activos
          </Text>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB7]}>
            {liveMatches && (
              <FlatList
                horizontal
                ListEmptyComponent={
                  <Banner
                    onPress={() => openScreenWithPush(NEW_MATCH_SCREEN_KEY)}
                    ctaText="CREAR PARTIDA"
                    title="Registra una partida"
                    subtitle="Crea una partida con tus jugadores y registra todos sus golpes para después poder analizarlos."
                  />
                }
                showsHorizontalScrollIndicator={false}
                data={liveMatches?.sort(sortByDate)}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </View>
        <DailyExercise />
        <View>
          <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
            Últimos partidos
          </Text>
          <View style={[t.mB5]}>
            {!loadingFinishedMatches &&
              finishedMatches
                // ?.sort(sortByDate)
                ?.map(match => <MatchResume key={match?.id} match={match} />)}
            {finishedMatches?.length === 0 && (
              <Text>No tienes ningún partido finalizado</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
