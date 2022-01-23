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
      <Text style={[t.fontSansBold, t.mB2]}>{label}</Text>
      <View
        style={[
          t.border,
          t.justifyCenter,
          t.pX4,
          t.pY4,
          t.roundedSm,
          t.borderGray400,
        ]}>
        <TextInput placeholderTextColor="#718096" {...props} />
        {error && <Text style={[t.fontSansMedium, t.textError]}>{error}</Text>}
      </View>
    </View>
  );
};
