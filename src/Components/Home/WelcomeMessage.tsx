import {format} from 'date-fns';
import es from 'date-fns/esm/locale/es/index.js';
import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';

export const WelcomeMessage = () => {
  const date = format(Date.now(), 'EEEE dd MMMM', {
    locale: es,
  });

  return (
    <View style={[t.mB5, t.pR10]}>
      <Text style={[t.text2xl, t.mB2, t.fontSansBold]}>Hoy</Text>
      <Text style={[t.textXl, t.fontSans]}>
        {capitalize(date.split(' ')[0]) +
          ' ' +
          date.split(' ')[1] +
          ' ' +
          capitalize(date.split(' ')[2])}
      </Text>
    </View>
  );
};
