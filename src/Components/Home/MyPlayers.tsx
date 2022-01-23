import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {PlayerType} from '../../Global/types';
import {Avatar as Player} from '../../Components/UI/Avatar';

import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {useGetPlayers} from '../../Hooks/useGetPlayers';

export const MyPlayers = () => {
  const {players} = useGetPlayers();

  const PlayerItem = ({item}: {item: PlayerType}) => (
    <Player
      img={item.profileImg}
      name={shortName(1, item.firstName, item.secondName)}
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
