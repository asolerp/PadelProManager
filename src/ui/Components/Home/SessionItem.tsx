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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

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
          colorParser[item.type === 'session' ? 'blue' : 'yellow'],
          t.roundedSm,
          t.shadowNone,
          style,
        ]}>
        <View
          style={[t.flexRow, t.itemsStart, t.itemsCenter, t.justifyBetween]}>
          <View style={[t.flexShrink, t.flex1]}>
            <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB1]}>
              <View style={[t.flexRow, t.itemsCenter]}>
                <FontAwesome name="map-marker" color="white" style={[t.mR1]} />
                {item?.club && (
                  <Text style={[t.fontSansMedium, t.textXs, t.textGray300]}>
                    {item?.club}
                  </Text>
                )}
              </View>
              {!!item?.startTime && !!item?.endTime && (
                <View style={[t.flexRow, t.itemsCenter]}>
                  <Icon name="ios-time-outline" color="white" />
                  <Chip
                    style={[]}
                    mainColor={item.type === 'session' ? 'info' : 'warningDark'}
                    text={`${format(startTime, HOUR_FORMAT)} - ${format(
                      endTime,
                      HOUR_FORMAT,
                    )}`}
                  />
                </View>
              )}
            </View>
            <Text style={[t.fontSansBold, t.textSm, t.textWhite, t.mB2]}>
              {item?.title}
            </Text>
            <Text style={[t.fontSansMedium, t.textXs, t.textGray300, t.mB3]}>
              {item?.notes}
            </Text>
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
