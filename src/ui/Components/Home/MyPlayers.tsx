import React from 'react';
import {View, FlatList} from 'react-native';
import {PlayerType} from '../../Global/types';
import {Avatar as Player} from '../../Components/UI/Avatar';

import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';

import {Banner} from '../UI/Banner';
import {NEW_PLAYER_SCREEN_KEY} from '../../Screens/NewPlayer/NewPlayer';

import {sortByName} from '../../Utils/sorts';

export const MyPlayers = ({players}) => {
  const PlayerItem = ({item}: {item: PlayerType}) => {
    return (
      <Player
        imageStyle={[t.w16, t.h16]}
        style={[t.mX2]}
        img={item?.profileImg}
        name={shortName(1, item?.firstName, item?.secondName?.split(' ')[0])}
        onPress={() =>
          openScreenWithPush(PLAYER_SCREEN_KEY, {
            playerId: item?.id,
            playerEmail: item?.email,
          })
        }
      />
    );
  };

  return (
    <View>
      {players?.length === 0 ? (
        <Banner
          imageSrc="https://res.cloudinary.com/enalbis/image/upload/v1648630621/PadelPro/varios/juan-lebron-finales-kUmG--620x349_abc_lmxjgh.jpg"
          onPress={() => openScreenWithPush(NEW_PLAYER_SCREEN_KEY)}
          mainColor="info"
          ctaText="CREAR JUGADOR"
          title="Seguimiento de jugadores"
          subtitle="Añade tus jugadores y lleva un registro de su evolución"
        />
      ) : (
        <View style={[t.flexRow, t.itemsCenter]}>
          <FlatList
            data={players?.sort(sortByName)}
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
