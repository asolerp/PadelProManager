import React from 'react';
import {View, Text, Image} from 'react-native';
import t from '../../Theme/theme';
import PressableOpacity from '../UI/PressableOpacity';

export const AppleButton = ({onPress}) => {
  return (
    <PressableOpacity onPress={onPress}>
      <View
        style={[
          t.flexRow,
          t.itemsCenter,
          t.p3,
          t.border,
          t.borderGray500,
          t.roundedSm,
        ]}>
        <Image
          source={require('../../Assets/apple.png')}
          resizeMode="contain"
          style={[t.w5, t.h5]}
        />
        <View style={[t.flex1, t.itemsCenter]}>
          <Text>Continuar con Apple</Text>
        </View>
      </View>
    </PressableOpacity>
  );
};
