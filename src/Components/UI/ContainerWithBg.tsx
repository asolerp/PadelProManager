import React from 'react';

import {View, ImageBackground, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  imageSrc?: string;
  style?: ViewStyle[];
  opacity?: number;
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const ContainerWithBg: React.FC<Props> = ({
  backgroundColor = 'info',
  children,
  imageSrc = DEFAULT_PROFILE_IMAGE,
  opacity = 50,
  style,
}) => {
  const capitalizedColor = capitalize(backgroundColor);
  const bg = t?.[`bg${capitalizedColor}`];
  const op = t?.[`opacity${opacity}`];

  return (
    <ImageBackground
      source={{uri: imageSrc}}
      imageStyle={[t.roundedLg]}
      style={[t.flexGrow, t.relative, style]}>
      <View style={[t.wFull, t.hFull, t.roundedLg, bg, op, t.absolute]} />
      <SafeAreaView style={[t.flexGrow, t.pX4]}>{children}</SafeAreaView>
    </ImageBackground>
  );
};