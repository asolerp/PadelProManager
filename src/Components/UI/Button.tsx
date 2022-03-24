import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  ButtonProps,
} from 'react-native';
import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';
import PressableOpacity from './PressableOpacity';
interface Props extends ButtonProps {
  style?: ViewStyle[];
  textStyle?: TextStyle[];
  title: string;
  active?: boolean;
  loading?: boolean;
  type?: 'error' | 'success' | 'info' | 'white' | 'inform';
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl';
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
  size = 'sm',
  active = false,
  type = 'info',
}) => {
  const capitalizedSize = capitalize(size);
  const textSize = t?.[`text${capitalizedSize}`];
  const [state, setState] = useState(false);

  const disabledStyles = disabled ? [t.opacity50] : [t.opacity100];

  const parseBgTypeColors = {
    success: [active ? t.bgSuccess : t.bgWhite, t.borderSuccessDark],
    error: [active ? t.bgError : t.bgWhite, t.borderErrorDark],
    info: [active ? t.bgGray900 : t.bgWhite, t.borderGray900],
    inform: [active ? t.bgInfo : t.bgWhite, t.borderInfoDark],
    white: [active ? t.bgWhite : t.bgTransparent, t.borderWhite],
  };

  const parseTextTypeColor = {
    success: active ? t.textWhite : t.textSuccessDark,
    error: active ? t.textWhite : t.textErrorDark,
    info: active ? t.textWhite : t.textGray900,
    inform: active ? t.textWhite : t.textInfoDark,
    white: active ? t.textGray700 : t.textWhite,
  };

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setState(false);
      }, 500);
    }
    return () => setState(false);
  }, [state]);

  return (
    <PressableOpacity
      disabled={disabled}
      disabledOpacity={0.5}
      onPress={
        !disabled
          ? () => {
              !state && onPress();
              setState(true);
            }
          : () => {}
      }
      style={[
        t.justifyCenter,
        t.itemsCenter,
        t.roundedSm,
        t.border,
        parseBgTypeColors[type],
        t.pX2,
        size === 'lg' || size === 'xl' ? t.pY3 : t.pY2,
        t.shadow,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={[t.flexRow, t.itemsCenter]}>
          <Text
            style={[
              parseTextTypeColor[type],
              disabledStyles,
              t.fontSansBold,
              textSize,
              textStyle,
            ]}>
            {title}
          </Text>
          {rightSide}
        </View>
      )}
    </PressableOpacity>
  );
};
