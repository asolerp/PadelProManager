import format from 'date-fns/format';
import React from 'react';

import {Text, View} from 'react-native';
import t from '../../Theme/theme';
import {HOUR_FORMAT} from '../../Utils/date-ext';
import {Avatar} from '../UI/Avatar';
import {Chip} from '../UI/Chip';
import {HDivider} from '../UI/HDivider';
import PressableOpacity from '../UI/PressableOpacity';

export const RenderItem = ({item, onPress, style}) => {
  const startTime = new Date(
    item?.startTime?._seconds * 1000 + item?.startTime?._nanoseconds / 1000000,
  );

  const endTime = new Date(
    item?.endTime?._seconds * 1000 + item?.endTime?._nanoseconds / 1000000,
  );

  return (
    <>
      <PressableOpacity
        onPress={onPress}
        style={[
          t.p3,
          {height: item.height},
          t.bgWhite,
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
        <Text style={[t.fontSansMedium, t.textXs, t.textGray800, t.mB4]}>
          {item?.description}
        </Text>

        {!!item?.startTime && !!item?.endTime && (
          <View style={[t.flexRow, t.itemsCenter, t.justifyBetween]}>
            <Chip
              mainColor="info"
              text={`${format(startTime, HOUR_FORMAT)} - ${format(
                endTime,
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
