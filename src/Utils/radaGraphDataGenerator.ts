import {processColor} from 'react-native';

export const radarGraphDataGenerator = (playerStatistics: any) => {
  const w = playerStatistics?.w || 0;
  const nf = playerStatistics?.nf || 0;
  const ef = playerStatistics?.ef || 0;

  const data = {
    dataSets: [
      {
        values: [
          {value: w?.vd || 0},
          {value: w?.vr || 0},
          {value: w?.fd || 0},
          {value: w?.fr || 0},
          {value: w?.bd || 0},
          {value: w?.br || 0},
          {value: w?.bj || 0},
          {value: w?.sm || 0},
          {value: w?.gl || 0},
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
          {value: nf?.vd || 0},
          {value: nf?.vr || 0},
          {value: nf?.fd || 0},
          {value: nf?.fr || 0},
          {value: nf?.bd || 0},
          {value: nf?.br || 0},
          {value: nf?.bj || 0},
          {value: nf?.sm || 0},
          {value: nf?.gl || 0},
        ],
        label: 'Errores no forzados',
        config: {
          color: processColor('#f44336'),
          drawFilled: true,
          drawValues: false,
          fillColor: processColor('#f44336'),
        },
      },
      {
        values: [
          {value: ef?.vd || 0},
          {value: ef?.vr || 0},
          {value: ef?.fd || 0},
          {value: ef?.fr || 0},
          {value: ef?.bd || 0},
          {value: ef?.br || 0},
          {value: ef?.bj || 0},
          {value: ef?.sm || 0},
          {value: ef?.gl || 0},
        ],
        label: 'Errors forced',
        config: {
          color: processColor('#2196f3'),
          drawFilled: true,
          drawValues: false,
          fillColor: processColor('#2196f3'),
          fillAlpha: 100,
          lineWidth: 2,
        },
      },
    ],
  };
  return data;
};
