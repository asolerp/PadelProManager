import React from 'react';

import {View, FlatList, Text} from 'react-native';
import t from '../../../Theme/theme';
import {Button} from '../../UI/Button';
import {PointHistoryItem} from '../PointHistoryItem';

import Icon from 'react-native-vector-icons/Ionicons';

import {useHistoryFilters} from './hooks/useHistoryFilters';
import {HDivider} from '../../UI/HDivider';
import {capitalize} from '../../../Utils/parsers';

export const HistoricRoute = ({match, pointsHistory}) => {
  const {historyList, favoriteFilter, setFavoriteFilter} = useHistoryFilters(
    match,
    pointsHistory,
  );

  const renderItem = ({item}) => {
    if (item?.alert) {
      const capitalizedColor = capitalize(item?.type);
      const bg = t?.[`bg${capitalizedColor}Dark`];
      return (
        <>
          <View style={[t.pY3, t.pX4, bg, t.roundedSm, t.mY3]}>
            <Text
              style={[t.fontSansMedium, t.textBase, t.textWhite, t.textCenter]}>
              {item.alert}
            </Text>
          </View>
          <HDivider />
        </>
      );
    }
    return <PointHistoryItem match={match} pointHistory={item} />;
  };
  return (
    <>
      <View style={[t.pX4]}>
        <View
          style={[
            t.h14,
            t.flexRow,
            t.itemsCenter,
            t.justifyCenter,
            {left: 120},
            t.absolute,
            t.z10,
          ]}>
          <Button
            onPress={() => setFavoriteFilter(!favoriteFilter)}
            active={favoriteFilter}
            title="Ver favoritos"
            type="error"
            textStyle={[t.textXs]}
            rightSide={
              <Icon
                name="ios-heart"
                color={favoriteFilter ? 'white' : 'red'}
                size={20}
                style={[t.mL2]}
              />
            }
          />
        </View>
        <View style={[t.mT5, t.flexGrow, t.itemsCenter, t.justifyCenter]}>
          <View style={[t.flexGrow, t.wFull]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={historyList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={[t.wFull]}
            />
          </View>
        </View>
      </View>
    </>
  );
};
