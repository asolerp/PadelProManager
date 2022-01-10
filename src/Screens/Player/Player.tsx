import React, {useState, useEffect} from 'react';

import {View, processColor} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';
import {Avatar as PlayerAvatar} from '../../Components/UI/Avatar';
import t from '../../Theme/theme';

import {useGetPlayer} from './hooks/useGetPlayer';

export const PLAYER_SCREEN_KEY = 'playerScreen';

const legend = {
  enabled: false,
  textSize: 14,
  form: 'CIRCLE',
  wordWrapEnabled: true,
};

export const PlayerScreen = ({route}) => {
  const {playerId} = route.params;
  const {player} = useGetPlayer({playerId});
  const [data, setData] = useState();
  const [xAxis, setXaxis] = useState();

  useEffect(() => {
    const testXAxis = {
      enabled: true,
      valueFormatter: [
        'Volea Derecha',
        'Volea Revés',
        'Fondo Derecha',
        'Fondo Revés',
        'Smatch',
        'Bandeja',
      ],
    };

    const testData = {
      dataSets: [
        {
          values: [
            {value: 100},
            {value: 110},
            {value: 105},
            {value: 115},
            {value: 110},
            {value: 110},
          ],
          label: 'Winners',
          config: {
            color: processColor('#4caf50'),
            drawFilled: true,
            drawValues: false,
            fillColor: processColor('#4caf50'),
            fillAlpha: 100,
            lineWidth: 2,
          },
        },
        {
          values: [
            {value: 105},
            {value: 115},
            {value: 121},
            {value: 110},
            {value: 105},
            {value: 110},
          ],
          label: 'Errores no forzados',
          config: {
            color: processColor('#f44336'),
            drawFilled: true,
            drawValues: false,
            fillColor: processColor('#f44336'),
          },
        },
      ],
    };
    setData(testData);
    setXaxis(testXAxis);
  }, []);

  return (
    <ScreenLayout withBack title={player?.firstName + ' ' + player?.secondName}>
      <View style={[t.mT7]}>
        <View style={[t.justifyCenter, t.itemsCenter]}>
          <PlayerAvatar img={player.profileImg} imageStyle={[t.w28, t.h28]} />
          <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
            <Stat label="Jugados" count={20} />
            <Stat label="Ganados" count={14} />
            <Stat label="Perdidos" count={6} />
          </View>
        </View>
        <View style={[t.itemsCenter, t.mT1]}>
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
            onSelect={event => console.log(event)}
            onChange={event => console.log(event.nativeEvent)}
            touchEnabled={false}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};
