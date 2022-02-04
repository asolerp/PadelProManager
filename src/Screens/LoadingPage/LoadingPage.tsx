import React from 'react';

import {Image, View, Text} from 'react-native';
import {ScreenLayout} from '../../Components/Layout';
import t from '../../Theme/theme';

export const LoadingPage = () => {
  return (
    <ScreenLayout style={[t.itemsCenter, t.bgBlack]} edges={['top', 'bottom']}>
      <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
        <Image
          resizeMode="contain"
          source={require('../../Assets/logo_white.png')}
          style={[t.h24, t.w20]}
        />
      </View>
    </ScreenLayout>
  );
};
