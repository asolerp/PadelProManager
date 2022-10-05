import React, {useContext} from 'react';
import {BlurView} from '@react-native-community/blur';

import {View, FlatList, Text, Dimensions} from 'react-native';
import t from '../../../Theme/theme';
import {Button} from '../../UI/Button';
import {PointHistoryItem} from '../PointHistoryItem';
import {SubscriptionContext} from '../../../Context/SubscriptionContext';
import Icon from 'react-native-vector-icons/Ionicons';

import {useHistoryFilters} from './hooks/useHistoryFilters';
import {HDivider} from '../../UI/HDivider';
import {capitalize} from '../../../Utils/parsers';
import {openScreenWithPush} from '../../../Router/utils/actions';
import {PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY} from '../../../Screens/PromotionalSubscription/PromotionalSubscription';

export const HistoricRoute = ({match, pointsHistory}) => {
  const {isSubscribed} = useContext(SubscriptionContext);

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
      {!isSubscribed && !match?.free && (
        <BlurView
          style={[
            t.absolute,
            t.z50,
            {
              width: Dimensions.get('window').width,
            },
            t.hFull,
            t.roundedSm,
            t.justifyCenter,
            t.itemsCenter,
          ]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white">
          <View
            style={[
              t.absolute,
              t.wFull,
              t.hFull,
              t.justifyStart,
              t.itemsCenter,
              t.pX10,
            ]}>
            <Text style={[t.mT20, t.mB10, t.textCenter, t.fontSans, t.textLg]}>
              Has superado el límite de partidos gratuitos, para visualizar este
              contenido has de tener una cuenta premium
            </Text>
            <Button
              title="Hazte premium"
              type="info"
              onPress={() =>
                openScreenWithPush(PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY)
              }
              active
            />
          </View>
        </BlurView>
      )}
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
