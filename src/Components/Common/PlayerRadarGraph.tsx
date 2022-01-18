import React from 'react';
import {processColor} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import t from '../../Theme/theme';

export const PlayerRadarGraph = ({data}) => {
  const legend = {
    enabled: false,
    textSize: 14,
    form: 'CIRCLE',
    wordWrapEnabled: true,
  };
  const xAxis = {
    enabled: true,
    valueFormatter: [
      'Volea Derecha',
      'Volea Revés',
      'Fondo Derecha',
      'Fondo Revés',
      'Bajada Derecha',
      'Bajada Revés',
      'Smatch',
      'Bandeja',
    ],
  };
  return (
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
  );
};
