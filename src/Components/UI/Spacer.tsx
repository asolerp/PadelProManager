import React from 'react';
import {View} from 'react-native';
import t from '../../Theme/theme';

export const Spacer = ({space}) => {
  return <View style={[t?.[`mB${space}`]]} />;
};
