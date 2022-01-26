import React, {FunctionComponent} from 'react';

import {Avatar as Player} from '../../Components/UI/Avatar';

import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {View, Text, ScrollView, Image} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Home/LiveMatchResume';
import {MatchResume} from '../../Components/Home/MatchResume';

import {players} from '../../Mocks/players';
import {MyPlayers} from '../../Components/Home/MyPlayers';

import {FlatList} from 'react-native-gesture-handler';
import {useGetLiveMatches} from '../../Hooks/useGetLiveMatches';
import {useGetFinishedMatches} from '../../Hooks/useGetFinishedMatches';
import {WelcomeMessage} from '../../Components/Home/WelcomeMessage';
import {GroupActionButton} from '../../Components/Home/GroupActionButtons';

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
  const {finishedMatches, loadingFinishedMatches} = useGetFinishedMatches();
  const {liveMatches, loadingLiveMatches} = useGetLiveMatches();

  const renderItem = ({item}) => (
    <LiveMatchResume key={item?.id} match={item} />
  );

  return (
    <ScreenLayout edges={['top', 'left', 'right']}>
      <View style={[t.absolute, t._top28, t.right0]}>
        <Image
          resizeMode="contain"
          source={require('../../Assets/logo.png')}
          style={[t.w14]}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[t.relative]}>
        {/* <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.mB5]}>
          <Text style={[t.textXl, t.fontSansBold]}>Padel Manager Pro</Text>
          <Player img={players[0].profileImg} />
        </View> */}
        <WelcomeMessage />
        {/* <GroupActionButton /> */}
        <View>
          <View style={[t.mB7]}>
            <MyPlayers />
          </View>
          <View>
            <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
              Partidos activos
            </Text>
            <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB7]}>
              {!loadingLiveMatches && liveMatches?.length > 0 && (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={liveMatches}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              )}
            </View>
          </View>
          <View>
            <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>
              Últimos partidos
            </Text>
            <View>
              {!loadingFinishedMatches &&
                finishedMatches?.map(match => (
                  <MatchResume key={match?.id} match={match} />
                ))}
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
