import React, {FunctionComponent, useContext} from 'react';

import {ScreenLayout, Header} from '../../Components/Layout';
import {View, Text, ScrollView, Image} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Common/LiveMatchResume';
import {MatchResume} from '../../Components/Home/MatchResume';

import {openScreenWithPush} from '../../Router/utils/actions';

import {MyPlayers} from '../../Components/Home/MyPlayers';

import {FlatList} from 'react-native-gesture-handler';
import {useGetLiveMatches} from '../../Hooks/useGetLiveMatches';
import {useGetFinishedMatches} from '../../Hooks/useGetFinishedMatches';
import {WelcomeMessage} from '../../Components/Home/WelcomeMessage';

import {Banner} from '../../Components/UI/Banner';
import {NEW_MATCH_SCREEN_KEY} from '../NewMatch/NewMatch';

import {DailyExercise} from '../../Components/Home/DailyExercise';
import {sortByDate} from '../../Utils/sorts';

import {SubscriptionContext} from '../../Context/SubscriptionContext';
import {HomeHeader} from '../../Components/Home/HomeHeader';
import {PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY} from '../PromotionalSubscription/PromotionalSubscription';

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
  const {finishedMatches, loadingFinishedMatches} = useGetFinishedMatches();

  const {isSubscribed} = useContext(SubscriptionContext);
  const {liveMatches, loadingLiveMatches} = useGetLiveMatches();

  const renderItem = ({item}) => (
    <LiveMatchResume key={item?.id} match={item} />
  );

  return (
    <ScreenLayout edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[t.relative]}>
        <HomeHeader />
        <WelcomeMessage />
        {!isSubscribed && (
          <Banner
            mainColor="warning"
            onPress={() =>
              openScreenWithPush(PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY)
            }
            title="PadelPro Premium"
            subtitle="Hazte premium para poder gestionar más jugadores y acceder a cientos de ejercicios para poder realizar con tus alumnos."
            ctaText="SABER MÁS"
            imageSrc="https://news.mondoiberica.com.es/wp-content/uploads/2021/03/Excelente-aspecto-este%CC%81tico-1-1024x471.jpg"
            style={[t.mB5]}
          />
        )}
        <View>
          <View style={[t.mB7]}>
            <MyPlayers />
          </View>
          <View>
            <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
              Partidos activos
            </Text>
            <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB7]}>
              {liveMatches?.length === 0 && !loadingLiveMatches && (
                <Banner
                  onPress={() => openScreenWithPush(NEW_MATCH_SCREEN_KEY)}
                  ctaText="CREAR PARTIDA"
                  title="Registra una partida"
                  subtitle="Crea una partida con tus jugadores y registra todos sus golpes para
            después poder analizarlos."
                />
              )}
              {liveMatches?.length > 0 && (
                <FlatList
                  horizontal
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
            <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
              Últimos partidos
            </Text>
            <View style={[t.mB5]}>
              {!loadingFinishedMatches &&
                finishedMatches
                  ?.sort(sortByDate)
                  ?.map(match => <MatchResume key={match?.id} match={match} />)}
              {finishedMatches?.length === 0 && (
                <Text>No tienes ningún partido finalizado</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
