import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAnimationGesturePoint = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetY = translateY.value;
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      zIndex.value = 1000;
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
    },
    onEnd: (event, ctx) => {
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

  return {
    gestureHandler,
    containerStyles,
  };
};
