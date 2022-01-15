import React from 'react';
import {View, Text, ViewStyle, Pressable} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {WINNER} from '../Match/utils/constants';

interface Props {
  text: string;
  type?: 'w' | 'nf' | 'ef';
  styles?: ViewStyle[];
  withClose?: boolean;
  onClose?: () => void;
}

export const Chip: React.FC<Props> = ({
  text,
  type = WINNER,
  withClose,
  onClose,
  styles,
}) => {
  const border = {
    w: t.borderSuccessDark,
    nf: t.borderErrorDark,
    ef: t.borderInfoDark,
  };

  const bg = {
    w: t.bgSuccessLight,
    nf: t.bgErrorLight,
    ef: t.bgInfoLight,
  };

  return (
    <>
      <View
        style={[
          t.rounded,
          t.pX2,
          t.pY1,
          t.border,
          border[type],
          bg[type],
          styles,
        ]}>
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
              t.roundedFull,
              t.bgWhite,
              t.w4,
              t.h4,
            ]}>
            <Icon name="close" size={10} color="red" />
          </Pressable>
        )}
        <Text style={[t.textWhite, t.textXs]}>{text}</Text>
      </View>
    </>
  );
};
