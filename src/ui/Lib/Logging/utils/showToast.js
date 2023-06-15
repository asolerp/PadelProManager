import Toast from 'react-native-toast-message';

import {TOAST_DURATION, TOAST_OFFSET} from '../constants';

export const showToast = ({
  title,
  subtitle,
  type = 'info',
  toastOffset = TOAST_OFFSET.BOTTOM,
  toastDuration = TOAST_DURATION.NORMAL,
}) => {
  Toast.show({
    type,
    text1: title,
    text2: subtitle,
    position: 'bottom',
    bottomOffset: toastOffset,
    visibilityTime: toastDuration,
  });
};
