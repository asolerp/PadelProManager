import React from 'react';
import {View, ViewStyle} from 'react-native';
import t from '../../Theme/theme';

const H_SIZE = 1;

interface Props {
  style?: ViewStyle[];
}

export const HDivider: React.FC<Props> = ({style}) => {
  return (
    <View style={[t.wFull, {height: H_SIZE}, t.bgBlack, t.opacity10, style]} />
  );
};
