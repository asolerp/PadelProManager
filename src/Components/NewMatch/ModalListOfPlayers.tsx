import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {useGetPlayers} from '../../Hooks/useGetPlayers';
import t from '../../Theme/theme';
import {FullModal} from '../Modal/FullModal';
import {HDivider} from '../UI/HDivider';
import {RadioButton} from '../UI/RadioButton';
import {Button} from '../UI/Button';
import {Header} from '../Layout/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../UI/Input';
import {useModalList} from './hooks/useModalList';
import {PlayerItem} from '../Players/PlayerItem';
import PressableOpacity from '../UI/PressableOpacity';

import {DEFAULT_PROFILE_IMAGE} from '../../Utils/constants';

const emptyPlayer = {
  id: -1,
  firstName: 'Jugador sin seguimiento',
  secondName: '',
  profileImg: DEFAULT_PROFILE_IMAGE,
};

export const ModalListOfPlayers = ({
  selectedPlayers,
  isVisible,
  onClose,
  onSave,
}) => {
  const {players} = useGetPlayers();

  const {
    player,
    search,
    setPlayer,
    setSearch,
    filteredList,
    handlePressPlayer,
  } = useModalList({
    selectedPlayers,
    list: players,
  });

  const renderItem = ({item}) => (
    <PlayerItem
      onPress={() => handlePressPlayer(item)}
      item={item}
      rightSide={
        <RadioButton
          onPress={() => handlePressPlayer(item)}
          active={item.id === player?.id}
        />
      }
    />
  );

  return (
    <FullModal isVisible={isVisible} onClose={onClose}>
      <Header
        title="Jugadores"
        rightSide={
          <PressableOpacity onPress={onClose}>
            <Icon name="close" size={25} />
          </PressableOpacity>
        }
      />
      <Input
        placeholder="Nombre del jugador"
        value={search}
        onChangeText={setSearch}
        style={[t.mT5]}
      />
      {filteredList && (
        <FlatList
          ListHeaderComponent={
            <PlayerItem
              onPress={() => handlePressPlayer(emptyPlayer)}
              item={emptyPlayer}
              rightSide={
                <RadioButton
                  onPress={() => handlePressPlayer(emptyPlayer)}
                  active={emptyPlayer?.id === player?.id}
                />
              }
            />
          }
          showsVerticalScrollIndicator={false}
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          contentContainerStyle={[t.flex1, t.mT8]}
        />
      )}

      <HDivider />
      <Button
        onPress={() => {
          onSave(player);
          setPlayer(null);
          onClose();
        }}
        active
        disabled={!player}
        title="Guardar"
        style={[t.mT4]}
        textStyle={[t.textLg]}
      />
    </FullModal>
  );
};
