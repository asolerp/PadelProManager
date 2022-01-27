import React from 'react';
import {View} from 'react-native';

import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {LiveResult} from './LiveResult';

export const MatchHeader = ({match}) => {
  return (
    <View style={[t.flexRow, t.mT10, t.justifyBetween]}>
      <View style={[t.flexRow, t.flexGrow, t.justifyCenter]}>
        {match.t1.map((player, i) => (
          <Avatar
            key={i}
            img={player?.profileImg}
            name={player?.secondName || `Jug ${i + 1}`}
          />
        ))}
      </View>
      <View style={[t.w20]}>
        <LiveResult game={match.game} />
      </View>
      <View style={[t.flexRow, t.flexGrow, t.justifyCenter]}>
        {match.t2.map((player, i) => (
          <Avatar
            key={i}
            img={player?.profileImg}
            name={player?.secondName || `Jug ${i + 3}`}
          />
        ))}
      </View>
    </View>
  );
};
