import React from 'react';

import {ActivityIndicator, Image, View} from 'react-native';
import {ScreenLayout} from '../../Components/Layout';
import t from '../../Theme/theme';

export const LOADING_PAGE_SCREEN_KEY = 'loadingScreen';

export const LoadingPage = () => {
  return (
    <ScreenLayout
      style={[t.itemsCenter, t.bgGray900]}
      edges={['top', 'bottom']}>
      <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
        <Image
          resizeMode="contain"
          source={require('../../Assets/logo.png')}
          style={[t.h24, t.w24, t.mB10]}
        />
        <ActivityIndicator color="white" size="large" />
      </View>
    </ScreenLayout>
  );
};
