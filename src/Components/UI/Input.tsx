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
  onInputPress?: () => void;
  empty?: boolean;
  withLabel?: boolean;
  withDivider?: boolean;
  subfix?: string;
  emptyValues?: React.ReactNode;
  error?: string;
  labelText?: string;
}

export const Input: React.FC<Props> = ({
  style,
  error,
  empty,
  subfix,
  labelText,
  onInputPress,
  withLabel = true,
  withDivider = true,
  emptyValues,
  inputStyle,
  ...props
}) => {
  return (
    <>
      <View style={[style]}>
        {withLabel && (
          <Text numberOfLines={1} style={[t.fontSans, t.textSm]}>
            {labelText || props?.placeholder}
          </Text>
        )}
        <View
          style={[
            t.justifyCenter,
            t.pY2,
            t.roundedSm,
            error ? t.borderErrorDark : t.borderGray400,
          ]}>
          {empty ? (
            <Pressable onPress={onInputPress}>
              {emptyValues ? (
                emptyValues
              ) : (
                <Text
                  style={[
                    t.fontSans,
                    t.textSm,
                    inputStyle,
                    {color: '#718096'},
                  ]}>
                  {props?.placeholder}
                </Text>
              )}
            </Pressable>
          ) : (
            <>
              {onInputPress ? (
                <Pressable onPress={onInputPress}>
                  <View pointerEvents="none">
                    <TextInput
                      textAlignVertical="top"
                      placeholderTextColor="#718096"
                      style={[
                        props.value ? t.fontSansBold : t.fontSans,
                        t.fontSans,
                        t.textSm,
                        inputStyle,
                        t.textGray900,
                        t.p0,
                      ]}
                      {...props}
                    />
                  </View>
                </Pressable>
              ) : (
                <View style={[subfix && t.flexRow]}>
                  <TextInput
                    textAlignVertical="top"
                    placeholderTextColor="#718096"
                    style={[
                      props.value ? t.fontSansBold : t.fontSans,
                      t.textSm,
                      t.textGray900,
                      inputStyle,
                      t.p0,
                    ]}
                    {...props}
                  />
                  {subfix && <Text style={[t.mL1]}>{subfix}</Text>}
                </View>
              )}
            </>
          )}
        </View>
        {error && (
          <Text style={[t.fontSansMedium, t.textError, t.mB2]}>{error}</Text>
        )}
        {withDivider && <HDivider />}
      </View>
    </>
  );
};
