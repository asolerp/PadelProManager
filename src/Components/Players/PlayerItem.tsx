import React from 'react';
import {View, Text, Pressable} from 'react-native';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {HDivider} from '../UI/HDivider';
import {openScreenWithPush} from '../../Router/utils/actions';

import Icon from 'react-native-vector-icons/Ionicons';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';

export const PlayerItem = ({item}) => {
  return (
    <Pressable
      onPress={() =>
        openScreenWithPush(PLAYER_SCREEN_KEY, {
          playerId: item?.id,
        })
      }>
      <View style={[t.pY2]}>
        <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <View style={[t.flexRow, t.itemsCenter]}>
            <Avatar img={item.profileImg} />
            <View style={[t.mL2]}>
              <Text style={[t.fontSansMedium, t.textLg]}>
                {item.firstName} {item.secondName}
              </Text>
              <Text style={[t.fontSans, t.textGray600]}>3ª categoría</Text>
            </View>
          </View>
          <Icon name="ios-chevron-forward" size={25} color="black" />
        </View>
      </View>
      <HDivider />
    </Pressable>
  );
};
