import React from 'react';
import {View} from 'react-native';

import {MatchType} from '../../Global/types';
import t from '../../Theme/theme';

import {sortByDate} from '../../Utils/sorts';
import {PaginatedList} from '../Common/PaginatedList';
import {ProMatchCard} from './ProMatch';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PRO_MATCH_SCREEN_KEY} from '../../Screens/ProMatch/ProMatch';

interface Props {
  proMatches: MatchType[];
}

export const ProMatchesList: React.FC<Props> = ({proMatches}) => {
  const renderItem = ({item}) => (
    <ProMatchCard
      onPress={() => openScreenWithPush(PRO_MATCH_SCREEN_KEY, {match: item})}
      match={item}
    />
  );

  return (
    <PaginatedList
      dotColor={[t.bgInfoDark]}
      data={proMatches?.sort(sortByDate)}
      renderItem={renderItem}
    />
  );
};
