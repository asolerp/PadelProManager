import React from 'react';
import {View, Text, Pressable} from 'react-native';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {HDivider} from '../UI/HDivider';
import {openScreenWithPush} from '../../Router/utils/actions';

import Icon from 'react-native-vector-icons/Ionicons';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import {Chip} from '../UI/Chip';
import {colorByCategory, colorByHand, handParse} from '../../Utils/parsers';

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
              <Text style={[t.fontSansMedium, t.textLg, t.mB1]}>
                {item.firstName} {item.secondName}
              </Text>
              <View style={[t.flexRow]}>
                <Chip
                  mainColor={colorByCategory[item?.category || 3]}
                  text={`${item?.category || 3}ª categoría`}
                  style={[t.mR1]}
                />
                <Chip
                  mainColor={colorByHand[item?.hand || 'right']}
                  text={`${handParse[item?.hand || 'right']}`}
                />
              </View>
            </View>
          </View>
          <Icon name="ios-chevron-forward" size={25} color="black" />
        </View>
      </View>
      <HDivider />
    </Pressable>
  );
};
