import React from 'react';
import {ImageBackground, Text, View, Pressable, ViewStyle} from 'react-native';
import t from '../../Theme/theme';

interface Props {
  img?: string;
  name?: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle[];
  imageStyle?: ViewStyle[];
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const Avatar: React.FC<Props> = ({
  img = DEFAULT_PROFILE_IMAGE,
  name,
  style,
  onPress,
  imageStyle,
  active = false,
}) => {
  return (
    <Pressable
      style={[
        t.flexCol,
        t.justifyCenter,
        t.itemsCenter,
        t.borderInfoDark,
        style,
      ]}
      onPress={onPress}>
      <ImageBackground
        source={{uri: img}}
        style={[t.w12, t.h12, t.mB1, imageStyle]}
        imageStyle={[t.roundedFull]}
        resizeMode="cover"
      />
      {name && (
        <>
          {active ? (
            <View style={[t.bgInfo, t.roundedSm, t.pX1, t.pY0_5]}>
              <Text style={[t.fontSansMedium, t.textSm, t.textWhite]}>
                {name}
              </Text>
            </View>
          ) : (
            <Text style={[t.fontSans, t.textSm]}>{name}</Text>
          )}
        </>
      )}
    </Pressable>
  );
};
