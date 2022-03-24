import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Image, View} from 'react-native';
import {ScreenLayout} from '../../Components/Layout';
import t from '../../Theme/theme';

export const LoadingPage = () => {
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({fade: true});
    })();
  });
  return (
    <ScreenLayout
      style={[t.itemsCenter, t.bgGray900]}
      edges={['top', 'bottom']}>
      <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
        <Image
          resizeMode="contain"
          source={require('../../Assets/logo.png')}
          style={[t.h24, t.w24]}
        />
      </View>
    </ScreenLayout>
  );
};
