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
      imageStyle={[t.w16, t.h16]}
      style={[t.mX2]}
      img={item.profileImg}
      name={shortName(1, item.firstName, item.secondName.split(' ')[0])}
      onPress={() =>
        openScreenWithPush(PLAYER_SCREEN_KEY, {
          playerId: item.id,
        })
      }
    />
  );

  return (
    <View>
      <View>
        <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>Mis jugadores</Text>
      </View>
      <FlatList
        data={players}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={item => item.id}
        renderItem={PlayerItem}
      />
    </View>
  );
};
