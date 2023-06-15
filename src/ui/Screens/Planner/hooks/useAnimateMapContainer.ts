/* eslint-disable immutable/no-mutation */

import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SCROLL_LIMIT} from '../utils/constants';

const timingOptions = {
  duration: 300,
};

export const useAnimateMapContainer = () => {
  const translateY = useSharedValue(-100);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      if (
        ctx.offsetY + event.translationY > -SCROLL_LIMIT &&
        ctx.offsetY + event.translationY < -100
      ) {
        translateY.value = ctx.offsetY + event.translationY;
      }
    },
    onEnd: (event, ctx) => {
      if (
        ctx.offsetY + event.translationY > -SCROLL_LIMIT &&
        ctx.offsetY + event.translationY < -SCROLL_LIMIT / 2
      ) {
        translateY.value = withTiming(-SCROLL_LIMIT, timingOptions);
      }
      if (
        ctx.offsetY + event.translationY > -SCROLL_LIMIT / 2 &&
        ctx.offsetY + event.translationY < -100
      ) {
        translateY.value = withTiming(-100, timingOptions);
      }
    },
  });

  const containerStyles = useAnimatedStyle(() => {
    return {
      marginTop: 100,
      marginBottom: -SCROLL_LIMIT,
      transform: [{translateY: translateY.value}],
    };
  });

  return {
    containerStyles,
    gestureHandler,
  };
};
