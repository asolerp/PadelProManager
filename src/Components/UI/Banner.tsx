import React from 'react';

import {View, Text, ImageBackground} from 'react-native';
import {Button} from '../UI/Button';
import t from '../../Theme/theme';

interface Props {
  title: string;
  subtitle: string;
  ctaText: string;
  onPress: () => void;
  imageSrc?: string;
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const Banner = ({
  title,
  subtitle,
  ctaText,
  onPress,
  imageSrc = DEFAULT_PROFILE_IMAGE,
}) => {
  return (
    <ImageBackground
      source={{uri: imageSrc}}
      imageStyle={[t.roundedLg, t.opacity50]}
      style={[t.wFull, t.h48, t.relative, t.shadow]}>
      <View
        style={[
          t.wFull,
          t.hFull,
          t.p3,
          t.roundedLg,
          t.bgSuccessLight,
          t.opacity80,
          t.absolute,
        ]}
      />
      <View style={[t.flex1, t.p3, t.roundedLg]}>
        <Text style={[t.fontSansBold, t.textWhite, t.text2xl, t.mB3]}>
          {title}
        </Text>
        <Text style={[t.fontSansMedium, t.textWhite, t.textLg]}>
          {subtitle}
        </Text>
        <View style={[t.flexGrow, t.justifyEnd, t.itemsCenter]}>
          <Button title={ctaText} onPress={onPress} />
        </View>
      </View>
    </ImageBackground>
  );
};
