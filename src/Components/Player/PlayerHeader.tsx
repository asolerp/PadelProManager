import React from 'react';

import {Image} from 'react-native';

import t from '../../Theme/theme';
import {Header} from '../Layout';

import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_PLAYER_SCREEN_KEY} from '../../Screens/NewPlayer/NewPlayer';

import {useGetPlayerId} from '../../Screens/Player/hooks/useGetPlayerId';
import {Avatar} from '../UI/Avatar';

export const PlayerHeader = ({position, playerId}) => {
  const {player} = useGetPlayerId();

  return (
    <Header
      position={position}
      leftSide={
        <Image
          resizeMode="contain"
          source={require('../../Assets/logo.png')}
          style={[t.h10, t.w8]}
        />
      }
      rightSide={
        <Avatar
          imageStyle={[t.w10, t.h10]}
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
  );
};
