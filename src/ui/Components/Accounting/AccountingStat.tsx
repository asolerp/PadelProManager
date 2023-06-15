import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';

export const AccountingStat = ({label, color, value}) => {
  return (
    <View
      style={[
        t.w20,
        t.h20,
        t.roundedSm,
        t.bgWhite,
        t.shadow,
        t.borderGray400,
        {borderWidth: 0.5},
      ]}>
      <Text style={[t.textCenter, t.fontSansBold, t.textXs, t.mT2]}>
        {label}
      </Text>
      <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
        <Text style={[t.fontSansBold, color]}>{value}</Text>
      </View>
    </View>
  );
};
