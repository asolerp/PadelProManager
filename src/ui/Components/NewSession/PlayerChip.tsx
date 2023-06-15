import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import PressableOpacity from '../UI/PressableOpacity';

export const PlayerChip = ({player, onClose}) => {
  return (
    <View
      style={[
        t.flexRow,
        t.itemsCenter,
        t.mR3,
        t.mY1,
        t.p1,
        {borderWidth: 2},
        t.borderInfo,
        t.roundedLg,
      ]}>
      <Avatar img={player?.profileImg} imageStyle={[t.w8, t.h8]} />
      <Text style={[t.fontSansBold, t.mR2, t.mL1]}>{player?.firstName}</Text>
      <PressableOpacity onPress={() => onClose()}>
        <Icon name="ios-close" color="red" size={18} />
      </PressableOpacity>
    </View>
  );
};
