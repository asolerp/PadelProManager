import React from 'react';

import {View, Text, ImageBackground, ViewStyle, Dimensions} from 'react-native';
import {Button} from '../UI/Button';
import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';

interface Props {
  title: string;
  subtitle: string;
  ctaText: string;
  onPress: () => void;
  imageSrc?: string;
  mainColor?: string;
  style?: ViewStyle[];
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const Banner: React.FC<Props> = ({
  title,
  subtitle,
  ctaText,
  onPress,
  style,
  mainColor = 'success',
  imageSrc = DEFAULT_PROFILE_IMAGE,
}) => {
  const capitalizedColor = capitalize(mainColor);
  const bg = t?.[`bg${capitalizedColor}Light`];

  return (
    <ImageBackground
      source={{uri: imageSrc}}
      imageStyle={[t.roundedSm, t.opacity50]}
      style={[
        {width: Dimensions.get('window').width - 32},
        t.h48,
        t.relative,
        t.shadow,
        style,
      ]}>
      <View
        style={[
          t.wFull,
          t.hFull,
          t.p3,
          t.roundedSm,
          bg,
          t.opacity60,
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
          <Button size="xs" title={ctaText} onPress={onPress} type="white" />
        </View>
      </View>
    </ImageBackground>
  );
};
