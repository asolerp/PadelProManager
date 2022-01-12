import React, {useState, useEffect} from 'react';

import {ScrollView, View, Text, processColor} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';
import {Avatar as PlayerAvatar} from '../../Components/UI/Avatar';
import t from '../../Theme/theme';
import {MatchResume} from '../../Components/Home/MatchResume';
import {matches} from '../../Mocks/matches';
import {useGetPlayer} from './hooks/useGetPlayer';

export const PLAYER_SCREEN_KEY = 'playerScreen';

const testMatch = matches[0];

const legend = {
  enabled: false,
  textSize: 14,
  form: 'CIRCLE',
  wordWrapEnabled: true,
};

export const PlayerScreen = ({route}) => {
  const {playerId} = route.params;
  const {player, globalStats, winners, nonforced} = useGetPlayer(playerId);
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
            {value: winners.vd},
            {value: winners.vi},
            {value: winners.fd},
            {value: winners.fi},
            {value: winners.sm},
            {value: winners.bd},
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
            {value: nonforced.vd},
            {value: nonforced.vi},
            {value: nonforced.fd},
            {value: nonforced.fi},
            {value: nonforced.sm},
            {value: nonforced.bd},
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
      <ScrollView style={[t.mT7]} showsVerticalScrollIndicator={false}>
        <View style={[t.justifyCenter, t.itemsCenter]}>
          <PlayerAvatar img={player.profileImg} imageStyle={[t.w28, t.h28]} />
          <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
            <Stat label="Jugados" count={globalStats.games} />
            <Stat label="Ganados" count={globalStats.win} />
            <Stat label="Perdidos" count={globalStats.lose} />
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
        <View>
          <Text style={[t.textLg, t.fontSansMedium, t.mB3]}>
            Últimos partidos
          </Text>
          <View>
            <MatchResume match={testMatch} />
            <MatchResume match={testMatch} />
            <MatchResume match={testMatch} />
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
