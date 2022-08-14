import React from 'react';
import {StyleSheet, View} from 'react-native';
import t from '../../Theme/theme';
import Pie from 'react-native-pie';

export const CircleChart = ({data, children}) => {
  console.log('DATA', data);
  const hasStatistics = data.some(s => s.percentage > 0);

  return (
    <View style={[t.w28, {alignItems: 'center'}]}>
      {hasStatistics && <Pie radius={50} innerRadius={40} sections={data} />}
      <View style={[t.w14, hasStatistics && styles.gauge]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', height: 1050},
  gauge: {
    position: 'absolute',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
});
