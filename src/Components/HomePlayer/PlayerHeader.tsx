import React from 'react';

import {Image, View} from 'react-native';

import t from '../../Theme/theme';
import {Header} from '../Layout';

import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_PLAYER_SCREEN_KEY} from '../../Screens/NewPlayer/NewPlayer';

import {useGetPlayerByUserId} from '../../Hooks/useGetPlayerByUserId';
import {Avatar} from '../UI/Avatar';
import {WelcomeMessage} from './WelcomeMessage';

export const PlayerHeader = ({position, playerId}) => {
  const {player} = useGetPlayerByUserId();

  return (
    <View style={[t.mB10]}>
      <Header
        position={position}
        leftSide={<WelcomeMessage />}
        rightSide={
          <Avatar
            imageStyle={[t.w12, t.h12]}
            style={[t.mX2]}
            img={player?.profileImg}
            onPress={() =>
              openScreenWithPush(NEW_PLAYER_SCREEN_KEY, {
                playerId: player?.id,
                edit: true,
              })
            }
          />
        }
      />
    </View>
  );
};
