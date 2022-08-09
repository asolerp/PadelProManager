import React from 'react';
import {Alert, Text, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {findInWhatArea, isInArea} from '../../Screens/NewPoint/utils/isInArea';
import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';
import PressableOpacity from '../UI/PressableOpacity';

interface Props {
  children: string;
  mainColor: string;
  onPress?: () => void;
  active?: boolean;
  onLayout?: any;
  areas?: any;
}

export const PointType: React.FC<Props> = ({
  children,
  mainColor,
  active = false,
  areas = {},
}) => {
  const capitalizedColor = capitalize(mainColor);

  const border = t?.[`border${capitalizedColor}Dark`];
  const bg = t?.[active ? `bg${capitalizedColor}` : 'bgWhite'];
  const textColor = active ? t.textWhite : t?.[`text${capitalizedColor}Dark`];

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const positionBoxX = useSharedValue(0);
  const zIndex = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      zIndex.value = 1000;
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: (event, ctx) => {
      const fPositionX =
        translateX.value <= 0
          ? positionBoxX.value + translateX.value
          : translateX.value + positionBoxX.value;
      const fPositionY = translateY.value;

      const {x, y, height, width} = areas?.area1;

      const wichArea = findInWhatArea(areas, fPositionX, fPositionY);

      // console.log(wichArea);

      if (wichArea) {
        runOnJS(Alert.alert)('Elemento dentro de area!', wichArea.name);
      }

      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    },
  });

  const containerStyles = useAnimatedStyle(() => {
    return {
      zIndex: zIndex.value,
      transform: [
        {translateY: translateY.value},
        {translateX: translateX.value},
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        onLayout={({nativeEvent}) =>
          (positionBoxX.value = nativeEvent.layout.x)
        }
        style={[
          t.w10,
          t.h10,
          t.mB2,
          t.justifyCenter,
          t.itemsCenter,
          t.roundedSm,
          t.shadow,
          active ? t.border0 : t.border,
          border,
          bg,
          containerStyles,
        ]}>
        <Text style={[t.fontSansBold, t.textBase, textColor, t.textCenter]}>
          {children}
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
