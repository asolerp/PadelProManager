import React from 'react';

import {View, Text, FlatList} from 'react-native';
import t from '../../../Theme/theme';
import {PointHistoryItem} from '../PointHistoryItem';
export const HistoricRoute = ({match, pointsHistory}) => {
  const historyList = pointsHistory?.sort(
    (a, b) => new Date(b.date.toDate()) - new Date(a.date.toDate()),
  );

  const renderItem = ({item}) => (
    <PointHistoryItem match={match} pointHistory={item} />
  );
  return (
    <View style={[t.mT5, t.flexGrow]}>
      {historyList ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={historyList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={[t.fontSansMedium, t.textCenter, t.mT4]}>
          ¡Empieza el partido!
        </Text>
      )}
    </View>
  );
};
