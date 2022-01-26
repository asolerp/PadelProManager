import React from 'react';
import {Text, ViewStyle, Pressable, ImageBackground} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';

interface Props {
  iconName: string;
  title: string;
  onPress?: () => void;
  type?: 'info' | 'success' | 'error';
  imageUrl?: string;
  style?: ViewStyle[];
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const ActionButton: React.FC<Props> = ({
  type = 'info',
  imageUrl = DEFAULT_PROFILE_IMAGE,
  onPress,
  iconName,
  title,
  style,
}) => {
  const typeParseStyles = {
    info: t.bgInfoDark,
    success: t.bgSuccessDark,
    error: t.bgErrorDark,
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        t.p2,
        t.w24,
        t.h32,
        t.shadow,
        t.roundedSm,
        typeParseStyles[type],
        t.itemsCenter,
        t.justifyCenter,
        style,
      ]}>
      <ImageBackground
        style={[t.w24, t.h32, t.justifyCenter, t.itemsCenter]}
        source={{uri: imageUrl}}
        imageStyle={[t.roundedSm, t.opacity30]}>
        <Icon name={iconName} size={25} style={[t.mB2]} color="white" />
        <Text style={[t.fontSansBold, t.textBase, t.textWhite, t.textCenter]}>
          {title}
        </Text>
      </ImageBackground>
    </Pressable>
  );
};
