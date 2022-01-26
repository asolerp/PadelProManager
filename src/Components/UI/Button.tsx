import React from 'react';
import {
  Text,
  View,
  Pressable,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  ButtonProps,
} from 'react-native';
import t from '../../Theme/theme';

interface Props extends ButtonProps {
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  title: string;
  active?: boolean;
  loading?: boolean;
  type?: 'error' | 'success' | 'info';
  onPress?: () => void;
  rightSide?: React.ReactNode;
}

export const Button: React.FC<Props> = ({
  style,
  textStyle,
  onPress,
  title,
  loading,
  disabled,
  rightSide,
  active = false,
  type = 'info',
}) => {
  const disabledStyles = disabled ? [t.opacity50] : [t.opacity100];

  const parseBgTypeColors = {
    success: [active ? t.bgSuccess : t.bgWhite, t.borderSuccessDark],
    error: [active ? t.bgError : t.bgWhite, t.borderErrorDark],
    info: [active ? t.bgInfo : t.bgWhite, t.borderInfoDark],
  };

  const parseTextTypeColor = {
    success: active ? t.textWhite : t.textSuccessDark,
    error: active ? t.textWhite : t.textErrorDark,
    info: active ? t.textWhite : t.textInfoDark,
  };

  return (
    <Pressable
      onPress={!disabled ? onPress : () => {}}
      style={[
        t.justifyCenter,
        t.itemsCenter,
        t.rounded,
        t.border,
        parseBgTypeColors[type],
        t.p2,
        t.shadow,
        style,
        disabled && t.opacity50,
      ]}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={[t.flexRow, t.itemsCenter]}>
          <Text
            style={[
              parseTextTypeColor[type],
              t.textSm,
              t.fontSansMedium,
              textStyle,
              disabledStyles,
            ]}>
            {title}
          </Text>
          {rightSide}
        </View>
      )}
    </Pressable>
  );
};
