import React, {FunctionComponent} from 'react';

import {Avatar as Player} from '../../Components/UI/Avatar';

import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Home/LiveMatchResume';
import {MatchResume} from '../../Components/Home/MatchResume';

import {players} from '../../Mocks/players';
import {MyPlayers} from '../../Components/Home/MyPlayers';

import {FlatList} from 'react-native-gesture-handler';
import {useGetLiveMatches} from '../../Hooks/useGetLiveMatches';
import {useGetFinishedMatches} from '../../Hooks/useGetFinishedMatches';

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
  const {finishedMatches, loadingFinishedMatches} = useGetFinishedMatches();
  const {liveMatches, loadingLiveMatches} = useGetLiveMatches();

  const renderItem = ({item}) => (
    <LiveMatchResume key={item?.id} match={item} />
  );

  return (
    <ScreenLayout edges={['top', 'left', 'right', 'bottom']}>
      <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.mB10]}>
        <Text style={[t.textXl, t.fontSansBold]}>Padel Manager Pro</Text>
        <Player img={players[0].profileImg} />
      </View>
      <View>
        <View style={[t.mB7]}>
          <MyPlayers />
        </View>
        <View>
          <Text style={[t.textLg, t.fontSansMedium, t.mB3]}>
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
          <Text style={[t.textLg, t.fontSansMedium, t.mB3]}>
            Últimos partidos
          </Text>
          <View>
            {!loadingFinishedMatches &&
              finishedMatches?.map(match => (
                <MatchResume key={match?.id} match={match} />
              ))}
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};
