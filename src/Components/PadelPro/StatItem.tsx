import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';

interface Props {
  t1Value: number | String;
  title: String;
  t2Value: number | String;
  gold?: Boolean;
}

const DARK_BLUE = '#21336B';
const DARK_GOLD = '#CA9944';

export const StatItem: React.FC<Props> = ({
  t1Value,
  t2Value,
  title,
  gold = false,
}) => {
  return (
    <View style={[t.flexRow]}>
      <View
        style={[
          t.h10,
          t.flex1,
          t.bgWhite,
          gold ? {backgroundColor: DARK_GOLD} : t.bgInfoLight,
          t.itemsCenter,
          t.justifyCenter,
        ]}>
        <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>{t1Value}</Text>
      </View>
      <View
        style={[
          t.flex4,
          t.bgWhite,
          t.h10,
          t.itemsCenter,
          t.justifyCenter,
          {backgroundColor: DARK_BLUE},
        ]}>
        <Text style={[t.fontSansBold, t.textWhite, t.textXs]}>
          {title.toUpperCase()}
        </Text>
      </View>
      <View
        style={[
          t.h10,
          t.flex1,
          t.bgWhite,
          gold ? {backgroundColor: DARK_GOLD} : t.bgInfoLight,
          t.itemsCenter,
          t.justifyCenter,
        ]}>
        <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>{t2Value}</Text>
      </View>
    </View>
  );
};
