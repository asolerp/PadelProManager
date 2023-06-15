import React from 'react';

import {View, Text, ViewStyle} from 'react-native';
import t from '../../Theme/theme';

import Icon from 'react-native-vector-icons/Ionicons';
import {popScreen} from '../../Router/utils/actions';
import PressableOpacity from '../UI/PressableOpacity';

interface Props {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  withBack?: boolean;
  position?: 'relative' | 'absolute';
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  mode?: 'dark' | 'default';
  withPadding?: boolean;
  leftStyles?: ViewStyle[];
  containerStyle?: ViewStyle[];
}

export const Header: React.FC<Props> = ({
  mode = 'default',
  title = '',
  subtitle = '',
  position = 'relative',
  withBack,
  withPadding = true,
  leftSide,
  rightSide,
  leftStyles,
  containerStyle,
}) => {
  return (
    <View
      style={[
        t.pB3,
        t.wFull,
        withPadding && t.pX4,
        t.itemsCenter,
        t.z20,
        t?.[position],
        t.shadowNone,
        t.border0,
        {elevation: 5},
        containerStyle,
      ]}>
      <View style={[t.flexRow]}>
        <View style={[t.w20, t.itemsStart, leftStyles]}>
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
        <View style={[t.w20, t.itemsEnd]}>{!!rightSide && rightSide}</View>
      </View>
      {subtitle ? (
        <View>
          {typeof subtitle === 'string' ? (
            <Text
              style={[
                t.fontSansMedium,
                t.textXs,
                mode === 'default' ? t.textGray500 : t.textWhite,
              ]}>
              {subtitle}
            </Text>
          ) : (
            subtitle
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
