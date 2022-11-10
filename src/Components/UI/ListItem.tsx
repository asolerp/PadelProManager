import React from 'react';
import {View, Text, TextStyle, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';

import PressableOpacity from './PressableOpacity';

interface Props {
  title: string;
  containerStyle?: ViewStyle[];
  textStyle?: TextStyle[];
  onPress?: () => void;
  iconName?: string;
  iconColor?: string;
  withIcon?: boolean;
}

export const ListItem: React.FC<Props> = ({
  title,
  textStyle,
  containerStyle,
  onPress,
  iconName,
  withIcon = true,
  iconColor = 'black',
}) => {
  return (
    <>
      <PressableOpacity
        onPress={onPress}
        style={[
          t.flexRow,
          t.justifyBetween,
          t.itemsCenter,
          t.p3,
          containerStyle,
        ]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          {iconName && <Icon name={iconName} size={25} color={iconColor} />}
          <Text
            style={[
              t.fontSans,
              t.textGray700,
              t.textSm,
              iconName && t.mL3,
              textStyle,
            ]}>
            {title}
          </Text>
        </View>
        {withIcon && (
          <Icon name="ios-chevron-forward" size={25} color="black" />
        )}
      </PressableOpacity>
    </>
  );
};
