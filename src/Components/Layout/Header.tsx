import React from 'react';

import {View, Text} from 'react-native';
import t from '../../Theme/theme';

import Icon from 'react-native-vector-icons/Ionicons';
import {popScreen} from '../../Router/utils/actions';
import PressableOpacity from '../UI/PressableOpacity';

interface Props {
  title?: string | React.ReactNode;
  withBack?: boolean;
  position?: 'relative' | 'absolute';
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  mode?: 'dark' | 'default';
  withPadding?: boolean;
}

export const Header: React.FC<Props> = ({
  mode = 'default',
  title = '',
  position = 'relative',
  withBack,
  withPadding = true,
  leftSide,
  rightSide,
}) => {
  return (
    <>
      <View
        style={[
          t.flexRow,
          t.pB3,
          withPadding && t.pX4,
          t.itemsCenter,
          t.z20,
          t?.[position],
        ]}>
        <View style={[t.minW10, t.itemsStart]}>
          {withBack && !leftSide ? (
            <PressableOpacity onPress={popScreen}>
              <Icon
                name="ios-chevron-back"
                size={30}
                color={mode === 'default' ? 'black' : 'white'}
                style={[t._mL2]}
              />
            </PressableOpacity>
          ) : (
            leftSide
          )}
        </View>
        <View style={[t.flexGrow, t.itemsCenter]}>
          {typeof title === 'string' ? (
            <Text
              style={[
                t.fontSansMedium,
                t.textXl,
                mode === 'default' ? t.textBlack : t.textWhite,
              ]}>
              {title}
            </Text>
          ) : (
            title
          )}
        </View>
        <View style={[t.minW10, t.itemsEnd]}>{!!rightSide && rightSide}</View>
      </View>
    </>
  );
};
