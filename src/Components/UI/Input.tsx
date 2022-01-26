import React from 'react';
import {View, Text, TextInput, TextInputProps, ViewStyle} from 'react-native';
import t from '../../Theme/theme';

interface Props extends TextInputProps {
  label?: string;
  style?: ViewStyle[];
  error?: string;
}

export const Input: React.FC<Props> = ({label, style, error, ...props}) => {
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
          style={[t.fontSans, t.textBase]}
          {...props}
        />
      </View>
      {error && (
        <Text style={[t.fontSansMedium, t.textError, t.mT1]}>{error}</Text>
      )}
    </View>
  );
};
