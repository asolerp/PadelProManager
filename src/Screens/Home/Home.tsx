import React, {FunctionComponent, useCallback} from 'react';

import {ScreenLayout} from '../../Components/Layout';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Common/LiveMatchResume';
import {MatchResume} from '../../Components/Home/MatchResume';

import {MyPlayers} from '../../Components/Home/MyPlayers';

import {DailyExercise} from '../../Components/Home/DailyExercise';
import {sortByDate} from '../../Utils/sorts';

import {HomeHeader} from '../../Components/Home/HomeHeader';

import {MyTodaySessions} from '../../Components/Home/MyTodaySessions';
import {useHideBootSplash} from '../../Hooks/useHideBootSplash';
import {useGetHomeData} from './hooks/useGetHomeData';
import {useFocusEffect} from '@react-navigation/native';
import {PlayersSkeleton} from '../../Components/Home/skeleton/PlayersSkeleton';
import {useTranslationWrapper} from '../../Hooks/useTranslationsWrapper';
import {LiveMatchesSkeleton} from '../../Components/Home/skeleton/LiveMatchesSkeleton';
import {DailyExerciseSkeleton} from '../../Components/Home/skeleton/DailyExerciseSkeleton';
import {LastMatchesSkeleton} from '../../Components/Home/skeleton/LastMatchesSkeleton';

import {ProMatchesList} from '../../Components/Home/ProMatchesList';
import {PaginatedList} from '../../Components/Common/PaginatedList';
import {ProMatchSkeleton} from '../../Components/Home/skeleton/ProMatchSkeleton';

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
  useHideBootSplash();
  const {loc} = useTranslationWrapper();
  const {
    refetch,
    players,
    finishedMatches,
    dailyExercise,
    liveMatches,
    proMatches,
    todaySessions,
    loading,
  } = useGetHomeData();

  useFocusEffect(
    useCallback(() => {
      const refetching = refetch();
      return () => refetching;
    }, []),
  );

  const renderItem = ({item}) => <LiveMatchResume match={item} />;

  return (
    <ScreenLayout edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[t.flex1, t.pX4]}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }>
        <HomeHeader />
        <View style={[t.mB7]}>
          <MyTodaySessions sessions={todaySessions} />
        </View>
        <View style={[t.mB7]}>
          {loading ? (
            <ProMatchSkeleton />
          ) : (
            <>
              <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
                {loc('home_screen_wpt_match_title')}
              </Text>
              <ProMatchesList proMatches={proMatches} />
            </>
          )}
        </View>
        <View style={[t.mB7]}>
          <View>
            <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
              {loc('MY_PLAYERS_TITLE')}
            </Text>
          </View>
          {loading ? <PlayersSkeleton /> : <MyPlayers players={players} />}
        </View>
        <View>
          <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
            Partidos activos
          </Text>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB7]}>
            {loading ? (
              <LiveMatchesSkeleton />
            ) : (
              <PaginatedList
                data={liveMatches?.sort(sortByDate)}
                renderItem={renderItem}
              />
            )}
          </View>
        </View>
        <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
          {loc('DAILY_EXERCISE_TITLE')}
        </Text>
        {loading ? (
          <DailyExerciseSkeleton />
        ) : (
          <DailyExercise exercise={dailyExercise} />
        )}
        <View>
          <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
            Últimos partidos
          </Text>
          {loading ? (
            <LastMatchesSkeleton />
          ) : (
            <View style={[t.mB5]}>
              {finishedMatches?.map(match => (
                <MatchResume key={match?.id} match={match} />
              ))}
              {finishedMatches?.length === 0 && (
                <Text>No tienes ningún partido finalizado</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
