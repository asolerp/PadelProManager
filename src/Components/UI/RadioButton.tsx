import React from 'react';
import t from '../../Theme/theme';

import {StyleSheet, View} from 'react-native';
import PressableOpacity from './PressableOpacity';

interface Props {
  active: boolean;
  onPress?: () => void;
}

export const RadioButton: React.FC<Props> = ({active, onPress}) => {
  const insideCircle = active ? t.bgInfoDark : t.bgWhite;

  return (
    <PressableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        t.borderInfoDark,
        t.p2,
        t.roundedFull,
        t.justifyCenter,
        t.itemsCenter,
        t.w8,
        t.h8,
      ]}>
      <View style={[insideCircle, t.w4, t.h4, t.roundedFull]} />
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 2,
  },
});
