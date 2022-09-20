import React from 'react';

import {MatchType} from '../../Global/types';

import {sortByDate} from '../../Utils/sorts';
import {PaginatedList} from '../Common/PaginatedList';
import {ProMatchCard} from './ProMatch';

interface Props {
  proMatches: MatchType[];
}

export const ProMatchesList: React.FC<Props> = ({proMatches}) => {
  const renderItem = ({item}) => <ProMatchCard match={item} />;

  return (
    <PaginatedList
      data={proMatches?.sort(sortByDate)}
      renderItem={renderItem}
    />
  );
};
