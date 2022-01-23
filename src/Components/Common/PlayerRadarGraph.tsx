import React from 'react';
import {processColor, Text} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import t from '../../Theme/theme';
import {legend, xAxis} from '../../Utils/graphParams';

export const PlayerRadarGraph = ({player, data}) => {
  return (
    <>
      <Text style={[t.fontSansBold]}>
        {player?.firstName} {player?.secondName}
      </Text>
      <RadarChart
        style={[t.itemsCenter, t.justifyCenter, {width: 300, height: 300}]}
        data={data}
        xAxis={xAxis}
        yAxis={{drawLabels: true}}
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
    </>
  );
};
