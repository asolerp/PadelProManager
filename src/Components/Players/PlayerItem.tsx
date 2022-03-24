import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {HDivider} from '../UI/HDivider';
import {openScreenWithPush} from '../../Router/utils/actions';

import Icon from 'react-native-vector-icons/Ionicons';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import {Chip} from '../UI/Chip';
import {
  categoryParse,
  colorByCategory,
  colorByHand,
  handParse,
} from '../../Utils/parsers';
import PressableOpacity from '../UI/PressableOpacity';

export const PlayerItem = ({
  item,
  index,
  onPress = () =>
    openScreenWithPush(PLAYER_SCREEN_KEY, {
      playerId: item?.id,
    }),
  rightSide,
}) => {
  return (
    <PressableOpacity onPress={onPress} disabledOpacity={0.5}>
      <View style={[t.pY2]}>
        <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <View style={[t.flexRow, t.itemsCenter]}>
            <Avatar img={item.profileImg} />
            <View style={[t.mL2]}>
              <Text style={[t.fontSansMedium, t.textLg, t.mB1]}>
                {item.firstName} {item.secondName}
              </Text>
              <View style={[t.flexRow, t.itemsCenter]}>
                <View style={[t.flexRow, t.itemsCenter, t.mR2]}>
                  {item?.category && (
                    <>
                      <Text
                        style={[t.fontSans, t.textXs, t.textGray800, t.mR1]}>
                        Categoría:
                      </Text>
                      <Chip
                        mainColor={colorByCategory[item?.category || 3]}
                        text={`${categoryParse[item?.category || 3]}`}
                        style={[t.mR1]}
                      />
                    </>
                  )}
                </View>
                <View style={[t.flexRow, t.itemsCenter]}>
                  {item?.hand && (
                    <>
                      <Text
                        style={[t.fontSans, t.textXs, t.textGray800, t.mR1]}>
                        Mano:
                      </Text>
                      <Chip
                        mainColor={colorByHand[item?.hand || 'right']}
                        text={`${handParse[item?.hand || 'right']}`}
                      />
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
          {rightSide ? (
            rightSide
          ) : (
            <Icon name="ios-chevron-forward" size={25} color="black" />
          )}
        </View>
      </View>
      <HDivider />
    </PressableOpacity>
  );
};
