import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {ProgressBar} from '../UI/ProgressBar';

export const StatisticItem = ({
  label,
  t1PointCount,
  t2PointCount,
  totalCount,
  withBar = true,
}) => {
  const getPrecentageOfTotal = numberOfPoints =>
    totalCount && (numberOfPoints * 100) / totalCount;

  return (
    <View style={[t.wFull, t.mB3]}>
      <View style={[t.flexRow, t.justifyBetween, t.mB2]}>
        <Text style={[t.w16, !withBar && t.fontSansBold]}>
          {t1PointCount || 0} {withBar && ` / ${totalCount || 0}`}
        </Text>
        <Text>{label}</Text>
        <Text style={[t.w16, !withBar && t.fontSansBold, t.textRight]}>
          {t2PointCount || 0} {withBar && `/ ${totalCount || 0}`}
        </Text>
      </View>
      {withBar ? (
        <View style={[t.flexRow]}>
          <ProgressBar
            fill={getPrecentageOfTotal(t1PointCount)}
            style={[t.mR1]}
          />
          <ProgressBar
            fill={getPrecentageOfTotal(t2PointCount)}
            position="right"
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
