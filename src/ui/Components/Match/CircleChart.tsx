import React from 'react';
import {StyleSheet, View} from 'react-native';
import t from '../../Theme/theme';
import Pie from 'react-native-pie';

const sizes = {
  normal: {
    radius: 50,
    innerRadius: 40,
    height: 100,
  },
  small: {
    radius: 35,
    innerRadius: 30,
    height: 70,
  },
};

export const CircleChart = ({data, children, size = 'normal'}) => {
  const hasStatistics = data.some(s => s.percentage > 0);
  const sizeCircle = sizes[size];

  return (
    <View style={[{alignItems: 'center'}, t.mR2]}>
      {hasStatistics && (
        <Pie
          radius={sizeCircle.radius}
          innerRadius={sizeCircle.innerRadius}
          sections={data}
        />
      )}
      <View
        style={[
          t.w14,
          hasStatistics && styles.gauge,
          {height: sizeCircle.height},
          !hasStatistics && t.itemsCenter,
          !hasStatistics && t.justifyCenter,
        ]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', height: 1050},
  gauge: {
    position: 'absolute',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
});
