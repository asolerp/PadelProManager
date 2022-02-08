import React from 'react';
import {View} from 'react-native';

import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {LiveResult} from './LiveResult';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';

export const MatchHeader = ({match}) => {
  return (
    <View style={[t.flexRow, t.justifyBetween]}>
      <View style={[t.flexRow, t.flexGrow, t.justifyCenter]}>
        {match?.t1?.map((player, i) => (
          <Avatar
            key={i}
            disabled={!player?.id}
            img={player?.profileImg}
            name={player?.secondName || `Jug ${i + 1}`}
            onPress={() =>
              player?.id &&
              openScreenWithPush(PLAYER_SCREEN_KEY, {
                playerId: player?.id,
              })
            }
          />
        ))}
      </View>
      <View style={[t.w20]}>
        <LiveResult game={match?.game} />
      </View>
      <View style={[t.flexRow, t.flexGrow, t.justifyCenter]}>
        {match?.t2.map((player, i) => (
          <Avatar
            key={i}
            disabled={!player?.id}
            img={player?.profileImg}
            name={player?.secondName || `Jug ${i + 3}`}
            onPress={() =>
              player?.id &&
              openScreenWithPush(PLAYER_SCREEN_KEY, {
                playerId: player?.id,
              })
            }
          />
        ))}
      </View>
    </View>
  );
};
