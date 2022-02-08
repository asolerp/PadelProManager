import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {PlayerType} from '../../Global/types';
import {Avatar as Player} from '../../Components/UI/Avatar';

import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {useGetPlayers} from '../../Hooks/useGetPlayers';
import {Banner} from '../UI/Banner';
import {NEW_PLAYER_SCREEN_KEY} from '../../Screens/NewPlayer/NewPlayer';
import {useCheckPermissions} from '../../Hooks/useCheckPermissions';

export const MyPlayers = () => {
  const {players} = useGetPlayers();
  const {handleCheckCreateNewPlayer} = useCheckPermissions();

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
      {players?.length === 0 ? (
        <Banner
          imageSrc="https://static3.lavozdigital.es/media/deportes/2020/09/06/v/juan-lebron-finales-kUmG--620x349@abc.jpg"
          onPress={() => openScreenWithPush(NEW_PLAYER_SCREEN_KEY)}
          mainColor="info"
          ctaText="CREAR JUGADOR"
          title="Seguimiento de jugadores"
          subtitle="Añade tus jugadores y lleva un registro de su evolución"
        />
      ) : (
        <View style={[t.flexRow, t.itemsCenter]}>
          <FlatList
            data={players}
            ListHeaderComponent={
              <Player
                imageStyle={[t.w16, t.h16]}
                style={[t.mX2]}
                name="Crear jugador"
                onPress={() =>
                  handleCheckCreateNewPlayer(() =>
                    openScreenWithPush(NEW_PLAYER_SCREEN_KEY),
                  )
                }
              />
            }
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => item.id}
            renderItem={PlayerItem}
          />
        </View>
      )}
    </View>
  );
};
