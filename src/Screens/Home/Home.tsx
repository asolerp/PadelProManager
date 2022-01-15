import React, {FunctionComponent} from 'react';

import {Avatar as Player} from '../../Components/UI/Avatar';

import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Home/LiveMatchResume';
import {MatchResume} from '../../Components/Home/MatchResume';

import {players} from '../../Mocks/players';
import {MyPlayers} from '../../Components/Home/MyPlayers';
import {useGetMatches} from '../../Hooks/useGetMatches';

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
  const {matches, loadingMatches} = useGetMatches();

  return (
    <ScreenLayout>
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
          <View
            style={[t.flexRow, t.w60, t.justifyBetween, t.itemsCenter, t.mB7]}>
            {!loadingMatches &&
              matches?.map(match => (
                <LiveMatchResume key={match?.id} match={match} />
              ))}
          </View>
        </View>
        <View>
          <Text style={[t.textLg, t.fontSansMedium, t.mB3]}>
            Últimos partidos
          </Text>
          <View>
            {/* <MatchResume match={matches} />
            <MatchResume match={matches} />
            <MatchResume match={matches} /> */}
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};
