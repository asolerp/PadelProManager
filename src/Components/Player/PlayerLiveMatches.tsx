import React from 'react';

import {FlatList, Text} from 'react-native';
import {useGetPlayerLiveMatches} from '../../Hooks/useGetPlayerLiveMatches';
import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_MATCH_SCREEN_KEY} from '../../Screens/NewMatch/NewMatch';
import t from '../../Theme/theme';

import {sortByDate} from '../../Utils/sorts';
import {LiveMatchResume} from '../Common/LiveMatchResume';

import {PaginatedList} from '../Common/PaginatedList';
import {Banner} from '../UI/Banner';

export const PlayerLiveMatches = ({liveMatches}) => {
  const renderItem = ({item}) => (
    <LiveMatchResume key={item?.id} match={item} />
  );
  return (
    <>
      {!liveMatches || liveMatches?.length === 0 ? (
        <Banner
          onPress={() => openScreenWithPush(NEW_MATCH_SCREEN_KEY)}
          ctaText="CREAR PARTIDA"
          title="Registra una partida"
          subtitle="Crea una partida registra todos tus golpes para después poder analizarlos."
        />
      ) : (
        <>
          <PaginatedList
            data={liveMatches?.sort(sortByDate)}
            renderItem={renderItem}
          />
        </>
      )}
    </>
  );
};
