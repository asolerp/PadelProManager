import React from 'react';
import {ImageBackground, Pressable, Text, View} from 'react-native';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PRO_MATCH_SCREEN_KEY} from '../../Screens/ProMatch/ProMatch';
import t from '../../Theme/theme';

import {ResultPro} from '../PadelPro/ResultPro';

export const ProMatchCard = ({match}) => {
  return (
    <Pressable
      onPress={() =>
        openScreenWithPush(PRO_MATCH_SCREEN_KEY, {match: match[0]})
      }>
      <ImageBackground
        resizeMode="stretch"
        style={[t.wFull, t.p4, t.itemsCenter]}
        imageStyle={[t.roundedSm]}
        source={{
          uri: 'https://res.cloudinary.com/enalbis/image/upload/v1662134698/PadelPro/varios/mia8e5e2lx6l3vwpa3be.jpg',
        }}>
        <View style={[t.flex1]}>
          <View style={[t.flexGrow]}>
            <Text
              numberOfLines={2}
              style={[
                t.w60,
                t.fontSansBold,
                t.textWhite,
                t.textXl,
                t.textCenter,
              ]}>
              ESTRELLA DAMM VALÈNCIA OPEN
            </Text>
          </View>
          <View style={[t.flexRow, t.itemsStart, t.justifyCenter, t.mY7]}>
            <Text style={[t.textWhite, t.fontSansMedium]}>
              Domingo 12:00h |{' '}
            </Text>
            <Text style={[t.textWhite, t.fontSansMedium]}>Semifinal</Text>
          </View>
        </View>
        <ResultPro />
      </ImageBackground>
    </Pressable>
  );
};
