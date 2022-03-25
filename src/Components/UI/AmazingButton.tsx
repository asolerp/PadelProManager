import React from 'react';

import {View, Text, ImageBackground, ViewStyle} from 'react-native';

import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';
import PressableOpacity from './PressableOpacity';

interface Props {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onPress: () => void;
  imageSrc?: string;
  mainColor?: string;
  style?: ViewStyle[];
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const AmazingButton: React.FC<Props> = ({
  title,
  onPress,
  style,

  mainColor = 'success',
  imageSrc = DEFAULT_PROFILE_IMAGE,
}) => {
  const capitalizedColor = capitalize(mainColor);
  const bg = t?.[`bg${capitalizedColor}Light`];

  return (
    <PressableOpacity style={[t.flex1]} onPress={onPress}>
      <ImageBackground
        source={{uri: imageSrc}}
        imageStyle={[t.roundedLg, t.opacity30]}
        style={[t.h32, t.relative, t.shadow, style]}>
        <View
          style={[
            t.wFull,
            t.hFull,
            t.p3,
            t.roundedLg,
            bg,
            t.opacity60,
            t.absolute,
          ]}
        />
        <View
          style={[t.flex1, t.justifyCenter, t.itemsCenter, t.p3, t.roundedLg]}>
          <Text style={[t.fontSansBold, t.textWhite, t.textLg, t.textCenter]}>
            {title}
          </Text>
        </View>
      </ImageBackground>
    </PressableOpacity>
  );
};
