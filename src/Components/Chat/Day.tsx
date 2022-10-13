import {format} from 'date-fns';
import React from 'react';
import {View, Text} from 'react-native';
import {isSameDay} from '../../Screens/Chat/utils/isSameDay';
import t from '../../Theme/theme';
export const Day = ({...props}) => {
  if (
    props.currentMessage == null ||
    isSameDay(props.currentMessage, props.previousMessage)
  ) {
    return null;
  }
  return (
    <View style={[t.justifyCenter, t.itemsCenter, t.mY3]}>
      <Text style={[t.textGray400, t.fontSansBold]}>
        {`${format(props?.currentMessage?.createdAt.toDate(), 'LLL d, y')}`}
      </Text>
    </View>
  );
};
