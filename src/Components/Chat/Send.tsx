import React from 'react';
import {View} from 'react-native';
import {Send as SendGiftedChat} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';

export const Send = ({...props}) => {
  return (
    <SendGiftedChat {...props}>
      <View style={[t.mT2, t.mR5]}>
        <View
          style={[
            t.p2,
            t.bgInfoDark,
            t.roundedFull,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Icon name="ios-send" size={16} color={t.textWhite.color} />
        </View>
      </View>
    </SendGiftedChat>
  );
};
