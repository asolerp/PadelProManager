import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import PressableOpacity from './PressableOpacity';

export const AddButton = ({onPress, iconName, style}) => {
  return (
    <PressableOpacity
      onPress={onPress}
      style={[
        t.w12,
        t.h12,
        t.absolute,
        t.right5,
        t.bottom10,
        t.roundedFull,
        t.justifyCenter,
        t.itemsCenter,
        t.z10,
        t.shadow,
        style,
      ]}>
      <Icon name={iconName} size={25} color="white" />
    </PressableOpacity>
  );
};
