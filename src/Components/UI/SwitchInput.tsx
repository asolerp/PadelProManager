import React from 'react';
import {View, Text, Switch} from 'react-native';
import t from '../../Theme/theme';

export const SwitchInput = ({label, subtitle, ...props}) => {
  return (
    <View
      style={[t.mB4, t.flexRow, t.justifyBetween, t.itemsCenter, t.roundedSm]}>
      <View style={{width: '80%'}}>
        <Text style={[t.fontSans, t.textBase, t.textGray900]}>{label}</Text>
        {subtitle && (
          <Text style={[t.fontSans, t.textXs, {color: '#718096'}, t.mT2]}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={[{width: '20%'}, t.itemsEnd]}>
        <Switch
          trackColor={{false: '#767577', true: '#2196f3'}}
          thumbColor={props.isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          {...props}
        />
      </View>
    </View>
  );
};
