import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {LiveResult} from './LiveResult';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import {firstSurname} from '../../Utils/parsers';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import {getTotalPlayerStatistics} from '../../Screens/NewPoint/utils/getTotalPointsPlayer';
import {TEAM1, TEAM2} from '../../Utils/constants';
import {CircleChart} from './CircleChart';

export const MatchHeader = ({match}) => {
  const {isCoach} = useFirebaseAuth();
  const avatarPressable = player => player?.id && player?.id !== -1 && isCoach;

  return (
    <View style={[t.flexRow, t.justifyBetween]}>
      <View style={[t.flexRow, t.flexGrow, t.justifyCenter]}>
        {match?.t1?.map((player, i) => (
          <View style={[t.itemsCenter]}>
            <CircleChart
              size="small"
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM1,
                match?.t1?.[i].id,
              )}>
              <Avatar
                key={i}
                disabled={!player?.id}
                img={player?.profileImg}
                onPress={() =>
                  avatarPressable(player) &&
                  openScreenWithPush(PLAYER_SCREEN_KEY, {
                    playerId: player?.id,
                    playerEmail: player?.email,
                  })
                }
              />
            </CircleChart>
            <Text style={[t.mT1, t.fontSansBold]}>
              {firstSurname(player?.secondName) || `Jug ${i + 1}`}
            </Text>
          </View>
        ))}
      </View>
      <View style={[{borderWidth: 1}, t.borderGray400]} />
      <View style={[t.flexRow, t.flexGrow, t.justifyCenter]}>
        {match?.t2.map((player, i) => (
          <View style={[t.itemsCenter]}>
            <CircleChart
              size="small"
              data={getTotalPlayerStatistics(
                match?.statistics,
                TEAM2,
                match?.t2?.[i].id,
              )}>
              <Avatar
                key={i}
                disabled={!player?.id}
                img={player?.profileImg}
                onPress={() =>
                  avatarPressable(player) &&
                  openScreenWithPush(PLAYER_SCREEN_KEY, {
                    playerId: player?.id,
                    playerEmail: player?.email,
                  })
                }
              />
            </CircleChart>
            <Text style={[t.mT1, t.fontSansBold]}>
              {firstSurname(player?.secondName) || `Jug ${i + 3}`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
