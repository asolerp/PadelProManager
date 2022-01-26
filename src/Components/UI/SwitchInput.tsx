import React from 'react';
import {View, Text, Switch} from 'react-native';
import t from '../../Theme/theme';

export const SwitchInput = ({label, ...props}) => {
  return (
    <View
      style={[
        t.mB4,
        t.pX3,
        t.flexRow,
        t.justifyBetween,
        t.itemsCenter,
        t.border,
        t.borderGray400,
        t.roundedSm,
        t.h14,
      ]}>
      <Text style={[t.fontSans, t.textBase, {color: '#718096'}]}>{label}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#2196f3'}}
        thumbColor={props.isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        {...props}
      />
    </View>
  );
};
