import React from 'react';
import {ImageBackground, Text, TextStyle, View, ViewStyle} from 'react-native';
import t from '../../Theme/theme';
import PressableOpacity from './PressableOpacity';

interface Props {
  img?: string;
  name?: string;
  active?: boolean;
  disabled?: boolean;
  style?: ViewStyle[];
  onPress?: () => void;
  imageStyle?: ViewStyle[];
  textStyle?: TextStyle[];
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const Avatar: React.FC<Props> = ({
  img = DEFAULT_PROFILE_IMAGE,
  name,
  style,
  onPress,
  disabled,
  textStyle,
  imageStyle,
  active = false,
}) => {
  return (
    <PressableOpacity
      disabledOpacity={0.4}
      disabled={disabled}
      style={[
        t.mX1,
        style,
        t.flexCol,
        t.justifyCenter,
        t.itemsCenter,
        t.borderWhite,
      ]}
      onPress={onPress}>
      <ImageBackground
        source={{uri: img}}
        style={[t.w12, t.h12, t.shadow, imageStyle]}
        imageStyle={[t.roundedFull]}
        resizeMode="cover"
      />
      {name && (
        <>
          {active ? (
            <View style={[t.bgInfo, t.roundedSm, t.pX1, t.pY0_5, t.mT1]}>
              <Text style={[t.fontSansMedium, t.textSm, t.textWhite]}>
                {name}
              </Text>
            </View>
          ) : (
            <Text style={[t.fontSansBold, t.textSm, t.pT2, textStyle]}>
              {name.toUpperCase()}
            </Text>
          )}
        </>
      )}
    </PressableOpacity>
  );
};
