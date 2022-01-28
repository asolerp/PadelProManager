import React from 'react';

import {View, Text, Pressable} from 'react-native';
import t from '../../Theme/theme';

import Icon from 'react-native-vector-icons/Ionicons';
import {popScreen} from '../../Router/utils/actions';

interface Props {
  title?: string;
  withBack?: boolean;
  position?: 'relative' | 'absolute';
  rightSide?: React.ReactNode;
}

export const Header: React.FC<Props> = ({
  title,
  position = 'relative',
  withBack,
  rightSide,
}) => {
  return (
    <View style={[t.flexRow, t.itemsCenter, t.z20, t?.[position]]}>
      <View style={[t.w7]}>
        {withBack && (
          <Pressable onPress={popScreen}>
            <Icon name="ios-chevron-back" size={30} color="black" />
          </Pressable>
        )}
      </View>
      <View style={[t.flexGrow, t.itemsCenter]}>
        <Text style={[t.fontSansBold, t.text2xl]}>{title}</Text>
      </View>
      <View style={[t.w7]}>{!!rightSide && rightSide}</View>
    </View>
  );
};
