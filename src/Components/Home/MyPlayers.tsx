import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {PlayerType} from '../../Global/types';
import {Avatar as Player} from '../../Components/UI/Avatar';

import {players} from '../../Mocks/players';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';

export const MyPlayers = () => {
  const PlayerItem = ({item}: {item: PlayerType}) => (
    <Player
      img={item.profileImg}
      name={shortName(item.firstName, item.secondName)}
      onPress={() =>
        openScreenWithPush(PLAYER_SCREEN_KEY, {
          playerId: item.id,
        })
      }
      style={[t.mR4]}
    />
  );

  return (
    <View>
      <View>
        <Text style={[t.textLg, t.fontSansMedium, t.mB3]}>Mis jugadores</Text>
      </View>
      <FlatList
        data={players}
        horizontal
        keyExtractor={item => item.id}
        renderItem={PlayerItem}
      />
    </View>
  );
};
