import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {HDivider} from './HDivider';

export const ListItem = ({title, textStyle, iconName, iconColor = 'black'}) => {
  return (
    <>
      <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.p3]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          <Icon name={iconName} size={25} color={iconColor} />
          <Text style={[t.fontSans, t.textLg, t.mL3, textStyle]}>{title}</Text>
        </View>
        <Icon name="ios-chevron-forward" size={25} color="black" />
      </View>
      <HDivider />
    </>
  );
};
