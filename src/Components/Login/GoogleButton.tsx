import React from 'react';

import {View, Text, Image} from 'react-native';
import t from '../../Theme/theme';
import PressableOpacity from '../UI/PressableOpacity';

export const GoogleButton = ({onPress}) => {
  return (
    <PressableOpacity onPress={onPress}>
      <View
        style={[
          t.flexRow,
          t.bgWhite,
          t.itemsCenter,
          t.p2,
          t.h12,
          t.border,
          t.borderGray500,
          t.roundedSm,
        ]}>
        <Image
          source={require('../../Assets/google.png')}
          resizeMode="contain"
          style={[t.w5, t.h5]}
        />
        <View style={[t.flex1, t.itemsCenter]}>
          <Text style={[t.fontSansMedium]}>Continuar con Google</Text>
        </View>
      </View>
    </PressableOpacity>
  );
};
