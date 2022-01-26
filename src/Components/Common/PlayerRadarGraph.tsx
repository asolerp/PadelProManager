import React from 'react';
import {processColor, View, Text} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import t from '../../Theme/theme';
import {legend, xAxis} from '../../Utils/graphParams';
import {ResumenStatistic} from '../Match/ResumenStatistic';

export const PlayerRadarGraph = ({player, data}) => {
  return (
    <View style={[t.mB4, t.itemsCenter]}>
      <Text style={[t.fontSansBold]}>
        {player?.firstName} {player?.secondName}
      </Text>
      <RadarChart
        style={[t.itemsCenter, t.justifyCenter, {width: 300, height: 300}]}
        data={data}
        xAxis={xAxis}
        yAxis={{drawLabels: false}}
        chartDescription={{text: ''}}
        legend={legend}
        drawWeb={true}
        webLineWidth={1}
        webLineWidthInner={1}
        webAlpha={255}
        webColorInner={processColor('#cbd5e0')}
        skipWebLineCount={1}
        touchEnabled={false}
      />
      <ResumenStatistic statistics={data.dataSets} />
    </View>
  );
};
