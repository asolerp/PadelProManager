import {format} from 'date-fns';
import React from 'react';

import {View, Text} from 'react-native';
import t from '../../Theme/theme';

export const Time = ({...props}) => {
  return (
    <View style={props.containerStyle}>
      <Text
        style={[
          t.fontSans,
          t.textXxs,
          props.position === 'left' ? t.textGray800 : t.textGray100,
          t.mB1,
          props.position === 'left' ? t.mL2 : t.mR2,
        ]}>
        {`${format(props.currentMessage.createdAt.toDate(), 'HH:mm')}`}
      </Text>
    </View>
  );
};
