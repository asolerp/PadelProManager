import React from 'react';

import {View, Text, Pressable} from 'react-native';
import t from '../../Theme/theme';

import Icon from 'react-native-vector-icons/FontAwesome';
import {popScreen} from '../../Router/utils/actions';

interface Props {
  title: string;
  withBack?: boolean;
  rightSide?: React.ReactNode;
}

export const Header: React.FC<Props> = ({title, withBack, rightSide}) => {
  return (
    <View style={[t.flexRow, t.itemsCenter]}>
      <View style={[t.w7]}>
        {withBack && (
          <Pressable onPress={popScreen}>
            <Icon name="chevron-left" size={20} color="black" />
          </Pressable>
        )}
      </View>
      <View style={[t.flexGrow, t.itemsCenter]}>
        <Text style={[t.fontSansBold, t.textLg]}>{title}</Text>
      </View>
      <View style={[t.w7]}>{!!rightSide && rightSide}</View>
    </View>
  );
};
