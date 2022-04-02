import format from 'date-fns/format';
import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import t from '../../Theme/theme';
import {HOUR_FORMAT} from '../../Utils/date-ext';
import {colorParser} from '../../Utils/sessionParsers';
import {Avatar} from '../UI/Avatar';
import {Chip} from '../UI/Chip';
import {HDivider} from '../UI/HDivider';
import PressableOpacity from '../UI/PressableOpacity';

export const RenderItem = ({item, onPress, style}) => {
  return (
    <>
      <PressableOpacity
        onPress={onPress}
        style={[
          t.p3,
          {height: item.height},
          styles.container,
          colorParser[item?.color],
          t.roundedSm,
          t.shadow,
          style,
        ]}>
        {item?.club && (
          <Text style={[t.fontSansMedium, t.textXs, t.textGray600, t.mB1]}>
            {item?.club}
          </Text>
        )}
        <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <Text style={[t.fontSansBold, t.textBase, t.mB1]}>{item?.title}</Text>
        </View>
        {item?.notes && (
          <Text style={[t.fontSansMedium, t.textXs, t.textGray800, t.mB4]}>
            {item?.notes}
          </Text>
        )}
        {!!item?.startTime && !!item?.endTime && (
          <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
            <Chip
              mainColor="info"
              text={`${format(Number(item?.startTime), HOUR_FORMAT)} - ${format(
                Number(item?.endTime),
                HOUR_FORMAT,
              )}`}
            />
            {item?.players && (
              <View style={[t.flexRow]}>
                {item?.players?.map(p => (
                  <Avatar
                    img={p?.profileImg}
                    imageStyle={[t.w8, t.h8]}
                    style={[t._mL4]}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </PressableOpacity>
      <HDivider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
});
