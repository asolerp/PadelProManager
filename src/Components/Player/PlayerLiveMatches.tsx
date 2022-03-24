import React from 'react';

import {FlatList} from 'react-native';
import {useGetPlayerLiveMatches} from '../../Hooks/useGetPlayerLiveMatches';
import {openScreenWithPush} from '../../Router/utils/actions';
import {sortByDate} from '../../Utils/sorts';
import {LiveMatchResume} from '../Common/LiveMatchResume';
import {Banner} from '../UI/Banner';
import {NEW_MATCH_SCREEN_KEY} from '../../Screens/NewMatch/NewMatch';

export const PlayerLiveMatches = ({userEmail}) => {
  const {liveMatches} = useGetPlayerLiveMatches(userEmail);

  const renderItem = ({item}) => (
    <LiveMatchResume key={item?.id} match={item} />
  );
  return (
    <>
      <FlatList
        horizontal
        ListEmptyComponent={
          <Banner
            onPress={() => openScreenWithPush(NEW_MATCH_SCREEN_KEY)}
            ctaText="CREAR PARTIDA"
            title="Registra una partida"
            subtitle="Crea una partida con tus jugadores y registra todos sus golpes para después poder analizarlos."
          />
        }
        showsHorizontalScrollIndicator={false}
        data={liveMatches?.sort(sortByDate)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};
