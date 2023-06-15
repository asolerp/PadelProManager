import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

import {openDrawer, openScreenWithPush} from '../../Router/utils/actions';
import {NEW_MATCH_SCREEN_KEY} from '../NewMatch/NewMatch';
import {useGetMatches} from '../../Hooks/useGetMatches';
import {MatchResume} from '../../Components/Home/MatchResume';

import {sortByDate} from '../../Utils/sorts';
import {SearchInput} from '../../Components/UI/SearchInput';
import {searchOptions} from '../../Utils/lists';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {HDivider} from '../../Components/UI/HDivider';
import {useCheckPermissions} from '../../Hooks/useCheckPermissions';

export const MATCHES_SCREE_KEY = 'matchesScreen';

export const Matches = () => {
  const {matches, setSearch, setSearchOption, search, searchOption} =
    useGetMatches();

  const {handleCheckSubscription} = useCheckPermissions();

  const renderItem = ({item}) => (
    <View style={[t.pX4]}>
      <MatchResume match={item} />
    </View>
  );

  return (
    <ScreenLayout edges={['top', 'bottom']}>
      <Header
        title="Historial de partidas"
        leftSide={
          <PressableOpacity onPress={openDrawer}>
            <Icon name="ios-menu" size={25} />
          </PressableOpacity>
        }
        rightSide={
          <PressableOpacity
            onPress={() =>
              handleCheckSubscription(matches?.length, () =>
                openScreenWithPush(NEW_MATCH_SCREEN_KEY),
              )
            }>
            <Icon name="ios-add-circle-outline" size={25} />
          </PressableOpacity>
        }
      />
      <HDivider />
      <View>
        <SearchInput
          value={search}
          defaultOption={searchOption}
          onChangeText={setSearch}
          onChange={setSearchOption}
          list={searchOptions}
          style={[t.mT5, t.mB5, t.pX4]}
        />
      </View>
      <FlatList
        ListEmptyComponent={() => (
          <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
            <Text style={[t.fontSans]}>No tienes ningúna partida</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <HDivider />}
        data={matches?.sort(sortByDate)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={[t.flex1, t.mT3]}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
};
