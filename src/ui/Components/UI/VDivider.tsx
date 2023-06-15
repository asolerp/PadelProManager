import React from 'react';
import {View} from 'react-native';
import t from '../../Theme/theme';

const V_SIZE = 1;

export const VDivider = () => {
  return <View style={[{width: V_SIZE}, t.hFull, t.bgBlack, t.opacity30]} />;
};
