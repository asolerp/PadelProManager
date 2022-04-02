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
      <View style={[t.mT10, t.mB3]}>
        <Input
          withLabel={false}
          value={search}
          onChangeText={setSearch}
          placeholder="Nombre del jugador"
        />
      </View>
      {!loadingPlayers && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </ScreenLayout>
  );
};
