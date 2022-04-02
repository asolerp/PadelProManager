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
import {HDivider} from './HDivider';

interface Props extends TextInputProps {
  style?: ViewStyle[];
  inputStyle?: TextStyle[];
  empty?: boolean;
  withLabel?: boolean;
  emptyValues?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<Props> = ({
  style,
  error,
  empty,
  withLabel = true,
  emptyValues,
  inputStyle,
  ...props
}) => {
  return (
    <>
      <View style={[style]}>
        {withLabel && (
          <Text style={[t.fontSans, t.textSm]}>{props?.placeholder}</Text>
        )}
        <View
          style={[
            t.justifyCenter,
            t.pY2,
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
        <HDivider />
      </View>
    </>
  );
};
