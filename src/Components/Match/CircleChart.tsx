import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {VictoryAxis, VictoryChart, VictoryPie} from 'victory-native';
import t from '../../Theme/theme';
import Pie from 'react-native-pie';

export const CircleChart = ({data, children}) => {
  return (
    <View style={[t.w28, {alignItems: 'center'}]}>
      <Pie radius={50} innerRadius={40} sections={data} />
      <View style={[t.w14, styles.gauge]}>{children}</View>
    </View>
    // <View style={[t.bgBlack, {width: 200, height: 200}]}>
    //   <VictoryChart width={200} height={200}>
    //     <VictoryAxis
    //       style={{
    //         axis: {stroke: 'transparent'},
    //         ticks: {stroke: 'transparent'},
    //         tickLabels: {fill: 'transparent'},
    //       }}
    //     />
    //     <VictoryPie
    //       data={data}
    //       colorScale={['#4caf50', '#2196f3', '#f44336']}
    //       standalone={false}
    //       width={200}
    //       height={200}
    //       labels={() => null}
    //       innerRadius={40}
    //       x="playerId"
    //       y="statistic"
    //     />
    //   </VictoryChart>
    // </View>
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
