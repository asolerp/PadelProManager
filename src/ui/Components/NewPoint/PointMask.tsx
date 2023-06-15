import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {mapResultBgStyle, mapShotNameShort} from '../Match/utils/maps';

export const PointMask = ({usedPoints, playerId}) => {
  const findUser = Object.entries(usedPoints).find(
    ([key, value]) => value.id === playerId,
  );

  return (
    <View
      style={[
        t.w16,
        t.h16,
        t.roundedFull,
        t.justifyCenter,
        t.itemsCenter,
        t.border1,
        t.borderWhite,
        mapResultBgStyle?.[findUser?.[1]?.result],
      ]}>
      <Text style={[t.textWhite, t.fontSansBold, t.textXl]}>
        {mapShotNameShort[findUser?.[1]?.type]}
      </Text>
    </View>
  );
};
