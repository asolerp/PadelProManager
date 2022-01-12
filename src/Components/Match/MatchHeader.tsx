import React from 'react';
import {View} from 'react-native';
import {PlayerType} from '../../Global/types';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {Avatar} from '../UI/Avatar';
import {LiveResult} from './LiveResult';

export const MatchHeader = ({match}) => {
  return (
    <View style={[t.flexRow, t.mT10, t.justifyBetween]}>
      <View style={[t.flexRow]}>
        {Object.entries(match.t1).map(([key, player]: [string, PlayerType]) => (
          <Avatar
            key={key}
            img={player.profileImg}
            name={shortName(player.firstName, player.secondName)}
            style={[t.mR3]}
          />
        ))}
      </View>
      <View style={[t.flexGrow]}>
        <LiveResult game={match.game} />
      </View>
      <View style={[t.flexRow]}>
        {Object.entries(match.t2).map(([key, player]: [string, PlayerType]) => (
          <Avatar
            key={key}
            img={player.profileImg}
            name={shortName(player.firstName, player.secondName)}
            style={[t.mL3]}
          />
        ))}
      </View>
    </View>
  );
};
