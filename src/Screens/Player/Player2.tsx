import React from 'react';
import {View, processColor} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Avatar as PlayerAvatar} from '../../Components/UI/Avatar';
import t from '../../Theme/theme';

import {useGetPlayer} from './hooks/useGetPlayer';

export const PLAYER_SCREEN_KEY = 'playerScreen';

const data = {
  $set: {
    dataSets: [
      {
        values: [
          {value: 100},
          {value: 110},
          {value: 105},
          {value: 115},
          {value: 110},
        ],
        label: 'DS 1',
        config: {
          color: '#FF8C9D',
          drawFilled: true,
          fillColor: '#FF8C9D',
          fillAlpha: 100,
          lineWidth: 2,
        },
      },
      {
        values: [
          {value: 115},
          {value: 100},
          {value: 105},
          {value: 110},
          {value: 120},
        ],
        label: 'DS 2',
        config: {
          color: '#C0FF8C',

          drawFilled: true,
          fillColor: '#C0FF8C',
          fillAlpha: 150,
          lineWidth: 1.5,
        },
      },
      {
        values: [
          {value: 105},
          {value: 115},
          {value: 121},
          {value: 110},
          {value: 105},
        ],
        label: 'DS 3',
        config: {
          color: '#8CEAFF',

          drawFilled: true,
          fillColor: '#8CEAFF',
        },
      },
    ],
  },
};

const legend = {
  enabled: true,
  textSize: 14,
  form: 'CIRCLE',
  wordWrapEnabled: true,
};

const xAxis = {
  $set: {
    valueFormatter: ['A', 'B', 'C', 'D', 'E'],
  },
};

export const PlayerScreen = ({route}) => {
  const {playerId} = route.params;
  const {player} = useGetPlayer({playerId});

  return (
    <ScreenLayout withBack title={player?.firstName + ' ' + player?.secondName}>
      <View style={[t.mT7]}>
        <PlayerAvatar img={player.profileImg} imageStyle={[t.w28, t.h28]} />
        <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
          <RadarChart
            style={[t.flex1]}
            data={data}
            xAxis={xAxis}
            yAxis={{drawLabels: true}}
            chartDescription={{text: ''}}
            legend={legend}
            drawWeb={true}
            webLineWidth={5}
            webLineWidthInner={5}
            webAlpha={255}
            webColor={processColor('red')}
            webColorInner={processColor('green')}
            skipWebLineCount={1}
            onSelect={event => console.log(event)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};
