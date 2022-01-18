import React from 'react';

import {View, Text, FlatList} from 'react-native';
import t from '../../../Theme/theme';
import {PointHistoryItem} from '../PointHistoryItem';
export const HistoricRoute = ({match, pointsHistory}) => {
  const renderItem = ({item}) => (
    <PointHistoryItem match={match} pointHistory={item} />
  );
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pointsHistory?.sort(
          (a, b) => new Date(b.date.toDate()) - new Date(a.date.toDate()),
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text style={[t.fontSansMedium, t.textCenter, t.mT4]}>
        ¡Empieza el partido!
      </Text>
    </View>
  );
};
