import {ar} from 'date-fns/locale';
import {useEffect, useState} from 'react';

import {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {findInWhatArea} from '../../../Screens/NewPoint/utils/isInArea';

export const useAnimatedPointType = ({
  mainColor,
  usedPoints,
  result,
  type,
  areas,
  onDrop,
}) => {
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const positionBoxX = useSharedValue(0);
  const positionBoxY = useSharedValue(0);
  const zIndex = useSharedValue(1);
  const elevation = useSharedValue(1);
  const progress = useSharedValue(0);
  const color = useSharedValue('#D3D3D3');

  const [areasArray, setAreasArray] = useState({});

  useEffect(() => {
    if (areas) {
      setAreasArray(areas);
    }
  }, [areas]);

  console.log('EFFECT AREAS', areasArray);

  useEffect(() => {
    if (usedPoints?.[result]?.type === type) {
      opacity.value = 0;
    } else {
      opacity.value = withTiming(1);
    }
  }, [type, result, opacity, usedPoints]);

  useEffect(() => {
    // opacity.value = 1;
    progress.value = withTiming(0);
    translateX.value = 0;
    translateY.value = 0;

    if (!mainColor) {
      progress.value = withTiming(0);
      color.value = '#D3D3D3';
    }
    if (mainColor === 'grey') {
      progress.value = withTiming(0);
      color.value = '#D3D3D3';
    }
    if (mainColor === 'info') {
      progress.value = withTiming(1);
      color.value = mapPointColor.info;
    }
    if (mainColor === 'success') {
      progress.value = withTiming(1);
      color.value = mapPointColor.success;
    }
    if (mainColor === 'error') {
      progress.value = withTiming(1);
      color.value = mapPointColor.error;
    }
  }, [mainColor, progress, color]);

  const mapPointColor = {
    success: '#4caf50',
    info: '#2196f3',
    error: '#f44336',
  };

  const pStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#D3D3D3', color.value],
    );
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#D3D3D3', color.value],
    );
    return {backgroundColor, borderColor};
  });

  const gestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      if (progress.value === 0) {
        return;
      }
      zIndex.value = 1000;
      elevation.value = 5;
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      const fPositionX =
        translateX.value <= 0
          ? positionBoxX.value + translateX.value
          : translateX.value + positionBoxX.value;
      const fPositionY =
        translateY.value <= 0
          ? positionBoxY.value + translateY.value
          : translateY.value + positionBoxY.value;

      const wichArea = findInWhatArea(areasArray, fPositionX, fPositionY);

      if (wichArea) {
        if (wichArea.id === -1) {
          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
          return;
        }
        opacity.value = withTiming(0, {}, () => {
          translateX.value = 0;
          translateY.value = 0;
        });

        runOnJS(onDrop)(wichArea.name);
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    },
  });

  const containerStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex: zIndex.value,
      transform: [
        {translateY: translateY.value},
        {translateX: translateX.value},
      ],
    };
  });

  return {
    containerStyles,
    gestureHandler,
    positionBoxX,
    positionBoxY,
    pStyle,
  };
};
