import te from 'date-fns/esm/locale/te/index.js';
import React from 'react';
import {Text, Pressable, ViewStyle, TextStyle} from 'react-native';
import t from '../../Theme/theme';

interface Props {
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  active?: boolean;
  children: string;
  type?: 'error' | 'success' | 'info';
  onPress?: () => void;
}

export const Button: React.FC<Props> = ({
  style,
  textStyle,
  onPress,
  children,
  active = false,
  type = 'info',
}) => {
  const parseBgTypeColors = {
    success: [active ? t.bgSuccessLight : t.bgWhite, t.borderSuccessDark],
    error: [active ? t.bgErrorLight : t.bgWhite, t.borderErrorDark],
    info: [active ? t.bgInfoLight : t.bgWhite, t.borderInfoDark],
  };

  const parseTextTypeColor = {
    success: active ? t.textWhite : t.textSuccessDark,
    error: active ? t.textWhite : t.textErrorDark,
    info: active ? t.textWhite : t.textInfoDark,
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        t.justifyCenter,
        t.itemsCenter,
        t.rounded,
        t.border,
        parseBgTypeColors[type],
        t.p2,
        t.shadow,
        style,
      ]}>
      <Text style={[parseTextTypeColor[type], t.textSm, textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
};
