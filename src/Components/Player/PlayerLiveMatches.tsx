import React from 'react';

import {FlatList} from 'react-native';
import {useGetPlayerLiveMatches} from '../../Hooks/useGetPlayerLiveMatches';
import {sortByDate} from '../../Utils/sorts';
import {LiveMatchResume} from '../Common/LiveMatchResume';

export const PlayerLiveMatches = ({playerId}) => {
  const {liveMatches} = useGetPlayerLiveMatches(playerId);

  const renderItem = ({item}) => (
    <LiveMatchResume key={item?.id} match={item} />
  );
  return (
    <>
      {liveMatches?.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={liveMatches?.sort(sortByDate)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </>
  );
};
