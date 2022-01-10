import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {popScreen} from '../../Router/utils/actions';
interface Props {
  withBack?: boolean;
  title?: string;
  rightSide?: React.ReactNode;
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<Props> = ({
  withBack = false,
  title,
  rightSide,
  children,
}) => {
  return (
    <SafeAreaView style={[t.flex1, t.pX4]}>
      <View style={[t.flexRow, t.mT3]}>
        <View style={[t.flex1]}>
          {withBack && (
            <Pressable onPress={() => popScreen()}>
              <Icon name="chevron-left" size={20} color="black" />
            </Pressable>
          )}
        </View>
        <View style={[t.flexGrow, t.itemsCenter]}>
          {title && <Text style={[t.textXl, t.fontSansBold]}>{title}</Text>}
        </View>
        <View style={[t.flex1]}>{!!rightSide && rightSide}</View>
      </View>
      {children}
    </SafeAreaView>
  );
};
