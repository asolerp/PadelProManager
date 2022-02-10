import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import PressableOpacity from './PressableOpacity';

export const AddButton = ({onPress, iconName, style}) => {
  return (
    <PressableOpacity
      onPress={onPress}
      style={[
        t.w14,
        t.h14,
        t.absolute,
        t.right5,
        t.bottom5,
        t.roundedFull,
        t.justifyCenter,
        t.itemsCenter,
        t.z10,
        t.shadow,
        style,
      ]}>
      <Icon name={iconName} size={35} color="white" />
    </PressableOpacity>
  );
};
