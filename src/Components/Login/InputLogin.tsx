import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {Platform, TextInputProps, View} from 'react-native';
import PressableOpacity from '../UI/PressableOpacity';

export const InputLogin: React.FC<TextInputProps> = ({...props}) => {
  return (
    <View
      style={[
        t.flexRow,
        t.flexGrow,
        t.itemsCenter,
        t.h14,
        t.wFull,
        t.border0_5,
        t.borderGray900,
        {backgroundColor: `${t.bgGray900.backgroundColor}80`},
        {borderRadius: 20},
        t.justifyCenter,
        t.pX4,
      ]}>
      {props.leftIconName && (
        <Icon
          name={props.leftIconName}
          size={20}
          color="white"
          style={[t.mR4]}
        />
      )}
      <View style={[t.flexGrow]}>
        <TextInput
          autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
          placeholderTextColor={t.textGray500.color}
          style={[t.textLg, t.textWhite, t.fontSans]}
          {...props}
        />
      </View>
      <PressableOpacity onPress={props.onPressRightIcon}>
        {props.rightIconName && (
          <Icon
            name={props.rightIconName}
            size={20}
            color="white"
            style={[t.mR4]}
          />
        )}
      </PressableOpacity>
    </View>
  );
};
