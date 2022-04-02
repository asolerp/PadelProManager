import React from 'react';
import {View, FlatList} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {useSearch} from '../../Components/Players/hooks/useSearch';
import {PlayerItem} from '../../Components/Players/PlayerItem';

import {Input} from '../../Components/UI/Input';
import {useGetPlayers} from '../../Hooks/useGetPlayers';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_PLAYER_SCREEN_KEY} from '../NewPlayer/NewPlayer';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useCheckPermissions} from '../../Hooks/useCheckPermissions';
import {HDivider} from '../../Components/UI/HDivider';
import {SearchInput} from '../../Components/UI/SearchInput';

export const PLAYERS_SCREEN_KEY = 'playersScreen';

export const Players = () => {
  const {players, loadingPlayers} = useGetPlayers();
  const {search, setSearch, filteredList} = useSearch({list: players});
  const {handleCheckCreateNewPlayer} = useCheckPermissions();

  const renderItem = ({item, index}) => (
    <PlayerItem item={item} index={index} />
  );

  return (
    <ScreenLayout>
      <Header
        title="Mis jugadores"
        rightSide={
          <PressableOpacity
            onPress={() =>
              handleCheckCreateNewPlayer(() =>
                openScreenWithPush(NEW_PLAYER_SCREEN_KEY),
              )
            }>
            <Icon name="ios-add-circle-outline" size={25} />
          </PressableOpacity>
        }
      />
      <HDivider />
      <View style={[t.mB3, t.pX4]}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          style={[t.mT5]}
          placeholder="Nombre del jugador"
        />
      </View>
      {!loadingPlayers && (
        <FlatList
          style={[t.pX4, t.mT3]}
          showsVerticalScrollIndicator={false}
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </ScreenLayout>
  );
};
