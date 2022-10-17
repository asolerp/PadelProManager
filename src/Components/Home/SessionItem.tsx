import format from 'date-fns/format';
import React, {useContext} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import t from '../../Theme/theme';
import {HOUR_FORMAT} from '../../Utils/date-ext';
import {colorParser} from '../../Utils/sessionParsers';
import {Avatar} from '../UI/Avatar';
import {Chip} from '../UI/Chip';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import PressableOpacity from '../UI/PressableOpacity';
import {openScreenWithPush} from '../../Router/utils/actions';

import {SESSION_SCREEN_KEY} from '../../Screens/Session/Session';

export const SessionItem = ({item, style}) => {
  const startTime = new Date(item?.startTime);
  const endTime = new Date(item?.endTime);

  return (
    <>
      <PressableOpacity
        onPress={() =>
          openScreenWithPush(SESSION_SCREEN_KEY, {sessionId: item.id})
        }
        style={[
          t.p3,
          styles.container,
          colorParser[item?.color],
          t.roundedSm,
          t.shadowNone,
          style,
        ]}>
        <View
          style={[t.flexRow, t.itemsStart, t.itemsCenter, t.justifyBetween]}>
          <View style={[t.flexShrink, t.flex1]}>
            {item?.club && (
              <Text style={[t.fontSansMedium, t.textXs, t.textGray600, t.mB1]}>
                {item?.club}
              </Text>
            )}
            <Text style={[t.fontSansBold, t.textBase, t.mB2]}>
              {item?.title}
            </Text>
            <Text style={[t.fontSansMedium, t.textXs, t.textGray800, t.mB3]}>
              {item?.notes}
            </Text>
            {!!item?.startTime && !!item?.endTime && (
              <View style={[t.flexRow, t.mT2]}>
                <Chip
                  style={[t.mB2]}
                  mainColor="primary"
                  text={`${format(startTime, HOUR_FORMAT)} - ${format(
                    endTime,
                    HOUR_FORMAT,
                  )}`}
                />
              </View>
            )}
          </View>
          <View style={[t.flex1, t.itemsEnd]}>
            {item?.players && (
              <View style={[t.flexRow, t.flexWrap, t.justifyCenter]}>
                {item?.players?.map(p => (
                  <Avatar
                    key={p?.id}
                    img={p?.profileImg}
                    imageStyle={[t.w10, t.h10]}
                    // style={[t._mL4, item?.players?.length > 2 && t._mB4]}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </PressableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#79e4f730',
    borderWidth: 2,
    borderColor: '#79e4f7',
  },
});
