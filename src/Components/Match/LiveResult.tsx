import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {resultGame} from '../../Utils/gameLogic';

interface LiveResultProps {
  game: {
    service: string;
    gt1: string;
    gt2: number;
    s1t1: number;
    s1t2: number;
    s2t1: number;
    s2t2: number;
    s3t1: number;
    s3t2: number;
  };
}

const TEAM1 = 't1';
const TEAM2 = 't2';

export const LiveResult: React.FC<LiveResultProps> = ({game}) => {
  const {service, s1t1, s1t2, s2t1, s2t2, s3t1, s3t2} = game;

  const result = resultGame(game).split('-');
  const isT1Serving = team => (team === service ? t.opacity100 : t.opacity30);

  return (
    <View style={[t.justifyCenter, t.itemsCenter]}>
      <View style={[t.flexRow, t.mB2]}>
        <Text style={[t.fontSansBold, isT1Serving(TEAM1), t.textXl, t.mR1]}>
          {result[0]}
        </Text>
        <Text style={[t.textXl]}>:</Text>
        <Text style={[t.fontSansBold, isT1Serving(TEAM2), t.textXl, t.mL1]}>
          {result[1]}
        </Text>
      </View>
      <View style={[t.flexRow]}>
        <Text
          style={[
            t.fontSansMedium,
            t.opacity30,
          ]}>{`${s1t1}-${s1t2},${s2t1}-${s2t2},${s3t1}-${s3t2}`}</Text>
      </View>
    </View>
  );
};
