import React from 'react';
import {ImageBackground, View, Text} from 'react-native';
import t from '../../Theme/theme';

interface Props {
  img?: string;
  name?: string;
}

const DEFAULT_PROFILE_IMAGE =
  'https://media.babolat.com//image/upload/f_auto,q_auto,c_scale,w_456,h_420/Website_content/Padel_landing_page/02092020-Launch/Product%20block%20right%20-%20balls/balls-range-new.jpg';

export const Avatar: React.FC<Props> = ({
  img = DEFAULT_PROFILE_IMAGE,
  name,
}) => {
  return (
    <View style={[t.flexCol, t.justifyCenter, t.itemsCenter]}>
      <ImageBackground
        source={{uri: img}}
        style={[t.w12, t.h12, t.mB1, t.shadowMd]}
        imageStyle={[t.roundedFull]}
        resizeMode="cover"
      />
      {name && <Text style={[t.fontSans, t.textSm]}>{name}</Text>}
    </View>
  );
};
