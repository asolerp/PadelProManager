import React from 'react';
import {View} from 'react-native';
import t from '../../Theme/theme';

const H_SIZE = 1;

export const HDivider = () => {
  return <View style={[t.wFull, {height: H_SIZE}, t.bgBlack, t.opacity10]} />;
};
