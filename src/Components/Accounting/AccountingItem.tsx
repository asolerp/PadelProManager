import {format} from 'date-fns';
import React from 'react';
import {View, Text} from 'react-native';
import {getCurrencies} from 'react-native-localize';
import {openScreenWithPush} from '../../Router/utils/actions';
import {SESSION_SCREEN_KEY} from '../../Screens/Session/Session';
import t from '../../Theme/theme';
import {getFormatLocale} from '../../Utils/formatLocale';
import {Avatar} from '../UI/Avatar';
import PressableOpacity from '../UI/PressableOpacity';

export const AccountingItem = ({item, balance}) => {
  return (
    <PressableOpacity
      onPress={() =>
        openScreenWithPush(SESSION_SCREEN_KEY, {sessionId: item.sessionId})
      }
      style={[t.p3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
      <View>
        <Text style={[t.mB2, t.fontSans, t.textSm, t.textGray500]}>
          {format(new Date(item?.date), 'iii d MMMM yyyy', {
            locale: getFormatLocale(),
          })}
        </Text>
        <Text style={[t.mB2]}>{item?.session?.title}</Text>
      </View>
      <View>
        <Text
          style={[
            t.fontSansBold,
            balance > 0 ? t.textErrorDark : t.textSuccessDark,
          ]}>
          {Math.round(balance)} {getCurrencies()[0]}
        </Text>
      </View>
    </PressableOpacity>
  );
};
