import React, {FunctionComponent} from 'react';

import {Avatar as Player} from '../../Components/UI/Avatar';

import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Home/LiveMatchResume';
import {MatchResume} from '../../Components/Home/MatchResume';

import {matches} from '../../Mocks/matches';
import {players} from '../../Mocks/players';
import {MyPlayers} from '../../Components/Home/MyPlayers';

const testMatch = matches[0];

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
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
            <LiveMatchResume match={testMatch} />
          </View>
        </View>
        <View>
          <Text style={[t.textLg, t.fontSansMedium, t.mB3]}>
            Últimos partidos
          </Text>
          <View>
            <MatchResume match={testMatch} />
            <MatchResume match={testMatch} />
            <MatchResume match={testMatch} />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};
