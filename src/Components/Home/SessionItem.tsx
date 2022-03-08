import format from 'date-fns/format';
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import t from '../../Theme/theme';
import {HOUR_FORMAT} from '../../Utils/date-ext';
import {Avatar} from '../UI/Avatar';
import {Chip} from '../UI/Chip';
import {HDivider} from '../UI/HDivider';
import PressableOpacity from '../UI/PressableOpacity';

export const SessionItem = ({item, style}) => {
  const startTime = new Date(
    item?.startTime?._seconds * 1000 + item?.startTime?._nanoseconds / 1000000,
  );

  const endTime = new Date(
    item?.endTime?._seconds * 1000 + item?.endTime?._nanoseconds / 1000000,
  );

  return (
    <>
      <PressableOpacity
        style={[
          t.p3,
          {height: item.height},
          styles.container,
          t.roundedSm,
          t.shadow,
          style,
        ]}>
        <View
          style={[t.flexRow, t.itemsStart, t.itemsCenter, t.justifyBetween]}>
          <View>
            {item?.club && (
              <Text style={[t.fontSansMedium, t.textXs, t.textGray600, t.mB1]}>
                {item?.club}
              </Text>
            )}
            <Text style={[t.fontSansBold, t.textBase, t.mB1]}>
              {item?.title}
            </Text>
            <Text style={[t.fontSansMedium, t.textXs, t.textGray800]}>
              {item?.description}
            </Text>
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
          </View>
          {!!item?.startTime && !!item?.endTime && (
            <View style={[t.itemsEnd]}>
              <View>
                {item?.players && (
                  <View style={[t.flexRow]}>
                    {item?.players?.map(p => (
                      <Avatar
                        key={p?.id}
                        img={p?.profileImg}
                        imageStyle={[t.w12, t.h12]}
                        style={[t._mL4]}
                      />
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </PressableOpacity>
      <HDivider />
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
