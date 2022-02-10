import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_MATCH_SCREEN_KEY} from '../NewMatch/NewMatch';
import {useGetMatches} from '../../Hooks/useGetMatches';
import {MatchResume} from '../../Components/Home/MatchResume';
import {FlatList} from 'react-native-gesture-handler';

import {sortByDate} from '../../Utils/sorts';
import {SearchInput} from '../../Components/UI/SearchInput';
import {searchOptions} from '../../Utils/lists';
import PressableOpacity from '../../Components/UI/PressableOpacity';

export const MATCHES_SCREE_KEY = 'matchesScreen';

export const Matches = () => {
  const {matches, setSearch, setSearchOption, search, searchOption} =
    useGetMatches();

  const renderItem = ({item}) => <MatchResume match={item} />;

  return (
    <ScreenLayout>
      <Header
        title="Historial de partidas"
        rightSide={
          <PressableOpacity
            onPress={() => openScreenWithPush(NEW_MATCH_SCREEN_KEY)}>
            <Icon name="ios-add-circle-outline" size={25} />
          </PressableOpacity>
        }
      />
      <SearchInput
        value={search}
        defaultOption={searchOption}
        onChangeText={setSearch}
        onChange={setSearchOption}
        list={searchOptions}
        style={[t.mT10, t.mB5]}
      />
      {matches?.length === 0 ? (
        <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
          <Text style={[t.fontSans]}>No tienes ningúna partida</Text>
        </View>
      ) : (
        <View style={[t.flexGrow]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={matches?.sort(sortByDate)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </ScreenLayout>
  );
};
