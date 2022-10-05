import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import t from '../../Theme/theme';

import {useBarChart} from './hooks/useBarChart';

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  barPercentage: 1,
  useShadowColorFromDataset: false,
};

export const BarChart = ({players, winners, errorForced, nonForced}) => {
  const {data} = useBarChart({players, winners, errorForced, nonForced});

  return (
    <View>
      {data && (
        <StackedBarChart
          data={data}
          width={Dimensions.get('window').width - 40}
          height={320}
          hideLegend={false}
          withHorizontalLabels={false}
          barPercentage={1}
          withVerticalLabels={true}
          chartConfig={chartConfig}
        />
      )}
    </View>
  );
};
