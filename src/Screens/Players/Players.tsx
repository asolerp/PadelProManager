import React, {useCallback} from 'react';
import {View, FlatList, Text, ScrollView, SectionList} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {useSearch} from '../../Components/Players/hooks/useSearch';
import {PlayerItem} from '../../Components/Players/PlayerItem';

import {useGetPlayersAndGroups} from '../../Hooks/useGetPlayersAndGroups';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {openDrawer, openScreenWithPush} from '../../Router/utils/actions';
import {NEW_PLAYER_SCREEN_KEY} from '../NewPlayer/NewPlayer';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useCheckPermissions} from '../../Hooks/useCheckPermissions';
import {HDivider} from '../../Components/UI/HDivider';
import {SearchInput} from '../../Components/UI/SearchInput';

import {useFocusEffect} from '@react-navigation/native';
import {PlayersSkeleton} from '../../Components/Players/PlayersSkeleton';
import {getCategoryPlayers} from './utils/getCategoryPlayers';
import {capitalize, categoryParse, colorByCategory} from '../../Utils/parsers';

export const PLAYERS_SCREEN_KEY = 'playersScreen';

export const Players = () => {
  const {groups, players, refetch} = useGetPlayersAndGroups();

  const {search, setSearch, filteredList} = useSearch({list: players});
  const {handleCheckSubscription} = useCheckPermissions();

  const renderItem = ({item, index}) => (
    <View style={[t.pX4]}>
      <PlayerItem item={item} index={index} />
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      const refetching = refetch();
      return () => refetching;
    }, []),
  );

  const categories = players && getCategoryPlayers(filteredList);

  return (
    <ScreenLayout edges={['top', 'bottom']}>
      <Header
        title="Mis jugadores"
        leftSide={
          <PressableOpacity onPress={openDrawer}>
            <Icon name="ios-menu" size={25} />
          </PressableOpacity>
        }
        rightSide={
          <PressableOpacity
            onPress={() =>
              handleCheckSubscription(players?.length, () =>
                openScreenWithPush(NEW_PLAYER_SCREEN_KEY),
              )
            }>
            <Icon name="ios-add-circle-outline" size={25} />
          </PressableOpacity>
        }
      />
      <HDivider />
      <View style={[t.pX4]}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          style={[t.mT5]}
          placeholder="Nombre del jugador"
        />
      </View>
      {/* {groups?.length > 0 && (
        <View style={[t.mT3, t.mB3, t.pX4]}>
          <Text style={[t.textLg, t.fontSans, t.textGray700]}>Grupos</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[t.flexRow, t.mT4]}>
            {groups?.map(g => (
              <View>
                <Avatar
                  onPress={() =>
                    openScreenWithPush(NEW_GROUP_SCREEN_KEY, {
                      groupToEdit: g,
                    })
                  }
                  imageStyle={[t.w12, t.h12]}
                  style={[t.mR4]}
                  img={g?.groupImage}
                />
                <Text style={[t.mT2, t.textXs, t.textGray600]}>
                  {g?.groupName}
                </Text>
              </View>
            ))}
          </ScrollView>
          <HDivider style={[groups?.length > 0 ? t.mT2 : t.mT5]} />
        </View>
      )} */}
      {!categories ? (
        <PlayersSkeleton />
      ) : (
        <SectionList
          sections={categories}
          style={[t.flex1, t.mT3]}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={[
                t.pX4,
                t.pY4,
                t.itemsCenter,
                t[`bg${capitalize(colorByCategory[title])}`],
              ]}>
              {console.log()}
              <Text style={[t.fontSansBold, t.textWhite]}>
                {categoryParse[title].toUpperCase()}
              </Text>
            </View>
          )}
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </ScreenLayout>
  );
};
