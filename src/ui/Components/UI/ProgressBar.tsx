import React from 'react';
import {View, ViewStyle} from 'react-native';
import t from '../../Theme/theme';

interface Props {
  fill: number;
  position?: 'left' | 'right';
  style?: ViewStyle[];
}

export const ProgressBar: React.FC<Props> = ({
  fill,
  position = 'left',
  style,
}) => {
  const positionStyles =
    position === 'left'
      ? [t.roundedTlLg, t.roundedBlLg, t.itemsEnd]
      : [t.roundedTrLg, t.roundedBrLg, t.itemsStart];

  return (
    <View style={[t.flex1, t.h4, t.bgGray300, positionStyles, style]}>
      <View style={[t.h4, t.bgInfo, positionStyles, {width: `${fill}%`}]} />
    </View>
  );
};
