import React from 'react';
import {View} from 'react-native';
import t from '../../Theme/theme';

export const Circle = ({color, children}) => {
  const backgroundColor = `${color.backgroundColor}30`;

  return (
    <View
      style={[
        t.w12,
        t.h12,
        t.bgInfo,
        t.justifyCenter,
        t.itemsCenter,
        {backgroundColor},
        t.roundedFull,
      ]}>
      {children}
    </View>
  );
};
