import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import t from '../../Theme/theme';

interface Props extends TextInputProps {
  style?: ViewStyle[];
  inputStyle?: TextStyle[];
  empty?: boolean;
  emptyValues?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<Props> = ({
  style,
  error,
  empty,
  emptyValues,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[style]}>
      <View
        style={[
          t.border,
          t.justifyCenter,
          t.pX4,
          t.pY4,
          t.roundedSm,
          error ? t.borderErrorDark : t.borderGray400,
        ]}>
        {empty ? (
          <Pressable onPress={props.onPressIn}>
            {emptyValues ? (
              emptyValues
            ) : (
              <Text
                style={[
                  t.fontSans,
                  t.textBase,
                  inputStyle,
                  {color: '#718096'},
                ]}>
                {props?.placeholder}
              </Text>
            )}
          </Pressable>
        ) : (
          <TextInput
            placeholderTextColor="#718096"
            style={[t.fontSans, t.textBase, inputStyle]}
            {...props}
          />
        )}
      </View>
      {error && (
        <Text style={[t.fontSansMedium, t.textError, t.mT1]}>{error}</Text>
      )}
    </View>
  );
};
