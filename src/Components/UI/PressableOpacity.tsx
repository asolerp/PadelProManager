import React, {useCallback} from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface PressableOpacityProps extends PressableProps {
  disabledOpacity?: number;
}

export type StyleType = (
  state: PressableStateCallbackType,
) => StyleProp<ViewStyle>;

export default function PressableOpacity(
  props: PressableOpacityProps,
): JSX.Element {
  const {style, disabled, disabledOpacity, ...passThroughProps} = props;

  const getOpacity = useCallback(
    (pressed: boolean) => {
      if (disabled) {
        return disabledOpacity ?? 1;
      } else {
        return pressed ? 0.6 : 1;
      }
    },
    [disabled, disabledOpacity],
  );
  const _style = useCallback<StyleType>(
    ({pressed}) => [style, {opacity: getOpacity(pressed)}],
    [getOpacity, style],
  );

  return <Pressable style={_style} disabled={disabled} {...passThroughProps} />;
}
