import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import PressableOpacity from '../UI/PressableOpacity';

const Day = ({active, day, onPress}) => {
  return (
    <PressableOpacity
      onPress={onPress}
      style={[
        t.w6,
        t.h6,
        t.justifyCenter,
        t.itemsCenter,
        active && t.bgInfo,
        t.roundedFull,
        {marginHorizontal: 1.5},
        ,
      ]}>
      <Text style={[t.fontSansMedium, t.textBase, active && t.textWhite]}>
        {day}
      </Text>
    </PressableOpacity>
  );
};

export const WeekRep = ({onPressDay, activeDays}) => {
  return (
    <View
      style={[
        t.p3,
        t.flexRow,
        t.mB4,
        {borderWidth: 1},
        t.borderGray400,
        t.roundedSm,
        t.itemsCenter,
        t.justifyBetween,
      ]}>
      <Text style={[t.fontSans, t.textBase, t.textGray600]}>
        Días de la semana
      </Text>
      <View style={[t.flexRow]}>
        <Day
          day="L"
          onPress={() => onPressDay(1)}
          active={activeDays.some(d => d === 1)}
        />
        <Day
          day="M"
          onPress={() => onPressDay(2)}
          active={activeDays.some(d => d === 2)}
        />
        <Day
          day="X"
          onPress={() => onPressDay(3)}
          active={activeDays.some(d => d === 3)}
        />
        <Day
          day="J"
          onPress={() => onPressDay(4)}
          active={activeDays.some(d => d === 4)}
        />
        <Day
          day="V"
          onPress={() => onPressDay(5)}
          active={activeDays.some(d => d === 5)}
        />
        <Day
          day="S"
          onPress={() => onPressDay(6)}
          active={activeDays.some(d => d === 6)}
        />
        <Day
          day="D"
          onPress={() => onPressDay(7)}
          active={activeDays.some(d => d === 7)}
        />
      </View>
    </View>
  );
};
