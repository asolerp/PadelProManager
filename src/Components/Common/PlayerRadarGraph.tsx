import React from 'react';
import {View, Text} from 'react-native';
import {RadarChart} from '../Common/RadarChart';
import t from '../../Theme/theme';
import {ResumenStatistic} from '../Match/ResumenStatistic';

export const PlayerRadarGraph = ({player, data, table, mode = 'dark'}) => {
  return (
    <View style={[t.mB4, t.itemsCenter]}>
      <Text style={[t.fontSansBold, mode === 'white' && t.textWhite]}>
        {player?.firstName.toUpperCase()} {player?.secondName.toUpperCase()}
      </Text>
      {data && (
        <RadarChart
          captions={data?.captions}
          data={data?.chart}
          options={data?.options}
          size={data?.size}
        />
      )}
      <ResumenStatistic statistics={table?.dataSets} />
    </View>
  );
};
