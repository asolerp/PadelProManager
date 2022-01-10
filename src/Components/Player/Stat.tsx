import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';

interface Props {
  label: string;
  count: number;
}

export const Stat: React.FC<Props> = ({label, count}) => {
  return (
    <View style={[t.justifyCenter, t.itemsCenter]}>
      <Text style={[t.textXs, t.fontSansMedium]}>{label}</Text>
      <Text style={[t.text5xl, t.fontSansBold, t.textInfo]}>{count}</Text>
    </View>
  );
};
