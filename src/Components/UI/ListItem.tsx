import React from 'react';
import {View, Text, TextStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {HDivider} from './HDivider';
import PressableOpacity from './PressableOpacity';

interface Props {
  title: string;
  textStyle?: TextStyle[];
  onPress?: () => void;
  iconName?: string;
  iconColor?: string;
  withIcon?: boolean;
}

export const ListItem: React.FC<Props> = ({
  title,
  textStyle,
  onPress,
  iconName,
  withIcon = true,
  iconColor = 'black',
}) => {
  return (
    <>
      <PressableOpacity
        onPress={onPress}
        style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.p3]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          {iconName && <Icon name={iconName} size={25} color={iconColor} />}
          <Text style={[t.fontSans, t.textLg, iconName && t.mL3, textStyle]}>
            {title}
          </Text>
        </View>
        {withIcon && (
          <Icon name="ios-chevron-forward" size={25} color="black" />
        )}
      </PressableOpacity>
      <HDivider />
    </>
  );
};
