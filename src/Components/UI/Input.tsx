import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import t from '../../Theme/theme';

interface Props extends TextInputProps {
  style?: ViewStyle[];
  inputStyle?: TextStyle[];
  error?: string;
}

export const Input: React.FC<Props> = ({
  style,
  error,
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
        <TextInput
          placeholderTextColor="#718096"
          style={[t.fontSans, t.textBase, inputStyle]}
          {...props}
        />
      </View>
      {error && (
        <Text style={[t.fontSansMedium, t.textError, t.mT1]}>{error}</Text>
      )}
    </View>
  );
};
