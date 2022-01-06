import React, {FunctionComponent} from 'react';

import {Avatar as Player} from '../../Components/UI/Avatar';

import {players} from '../../Mocks/players';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {LiveMatchResume} from '../../Components/Home/LiveMatchResume';

export const HOME_SCREEN_KEY = 'homeScreen';

export const HomeScreen: FunctionComponent = () => {
  return (
    <ScreenLayout>
      <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
        <Text style={[t.textXl, t.fontSansBold]}>Padel Manager Pro</Text>
        <Player img={players[0].profileImg} />
      </View>
      <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
        <LiveMatchResume />
      </View>
    </ScreenLayout>
  );
};
