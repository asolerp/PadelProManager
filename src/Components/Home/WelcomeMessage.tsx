import {format} from 'date-fns';
import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';

export const WelcomeMessage = () => {
  return (
    <View style={[t.mB10, t.pR10]}>
      <Text style={[t.text2xl, t.mB2, t.fontSansBold]}>Hoy</Text>
      <Text style={[t.textXl]}>{format(Date.now(), 'EEEE dd MMMM')}</Text>
    </View>
  );
};
