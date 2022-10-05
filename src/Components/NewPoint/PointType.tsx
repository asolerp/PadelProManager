import React from 'react';
import {Text} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import t from '../../Theme/theme';

import {useAnimatedPointType} from './hooks/useAnimatedPointType';

interface Props {
  children: string;
  mainColor: string;
  onPress?: () => void;
  onDrop?: () => void;
  match?: any;
  result?: string;
  type: 'fd' | 'fr' | 'vd' | 'vr' | 'bd' | 'br' | 'sm' | 'gl' | 'bj';
  active?: boolean;
  onLayout?: any;
  areas?: any;
  usedPoints?: any;
}

export const PointType: React.FC<Props> = ({
  children,
  mainColor,
  result,
  type,
  active = false,
  usedPoints = {},
  areas,
  onDrop = () => {},
}) => {
  const textColor = t.textWhite;

  const handleOnDrop = area => {
    onDrop(area);
  };

  const {containerStyles, gestureHandler, positionBoxX, positionBoxY, pStyle} =
    useAnimatedPointType({
      mainColor,
      usedPoints,
      onDrop: handleOnDrop,
      areas,
      result,
      type,
    });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        onLayout={({nativeEvent}) => {
          positionBoxX.value = nativeEvent.layout.x;
          positionBoxY.value = nativeEvent.layout.y;
        }}
        style={[
          t.w8,
          t.h8,
          t.mY1,
          t.mX1,
          t.justifyCenter,
          t.itemsCenter,
          t.roundedFull,
          t.shadow,
          active ? t.border0 : t.border,
          pStyle,
          containerStyles,
        ]}>
        <Text style={[t.fontSansBold, t.textSm, textColor, t.textCenter]}>
          {children}
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
