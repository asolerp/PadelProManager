import React from 'react';
import {View, Text, ViewStyle, Pressable} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

import {capitalize} from '../../Utils/parsers';

interface Props {
  text: string;
  mainColor?: string;
  style?: ViewStyle[];
  withClose?: boolean;
  onClose?: () => void;
}

export const Chip: React.FC<Props> = ({
  text,
  mainColor = 'success',
  withClose,
  onClose,
  style,
}) => {
  const capitalizedColor = capitalize(mainColor);
  const paddingVertical = 4;

  const bg = t?.[`bg${capitalizedColor}`];
  const textColor = t?.['textWhite'];
  return (
    <>
      <View style={[t.roundedSm, t.pX1, {paddingVertical}, bg, style]}>
        {withClose && (
          <Pressable
            onPress={onClose}
            style={[
              t.absolute,
              t._right2,
              t._top2,
              t.z10,
              t.border,
              t.borderError,
              t.justifyCenter,
              t.itemsCenter,
              t.rounded,
              t.bgWhite,
              t.w4,
              t.h4,
            ]}>
            <Icon name="close" size={10} color="red" />
          </Pressable>
        )}
        <Text style={[textColor, t.textXs, t.fontSansMedium]}>{text}</Text>
      </View>
    </>
  );
};
