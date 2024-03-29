import React from 'react';
import {FlatList, View, Text} from 'react-native';
import {useGetPlayersAndGroups} from '../../Hooks/useGetPlayersAndGroups';
import t from '../../Theme/theme';
import {FullModal} from '../Modal/FullModal';
import {HDivider} from '../UI/HDivider';
import {RadioButton} from '../UI/RadioButton';
import {Button} from '../UI/Button';
import {Header} from '../Layout/Header';
import Icon from 'react-native-vector-icons/Ionicons';

import {useModalList} from './hooks/useModalList';
import {PlayerItem} from '../Players/PlayerItem';
import PressableOpacity from '../UI/PressableOpacity';

import {DEFAULT_PROFILE_IMAGE} from '../../Utils/constants';
import {SearchInput} from '../UI/SearchInput';

const emptyPlayer = {
  id: -1,
  firstName: 'Jugador sin seguimiento',
  secondName: '',
  profileImg: DEFAULT_PROFILE_IMAGE,
};

export const ModalListOfPlayers = ({
  withEmpyPlayer = true,
  chat = false,
  selectedPlayers,
  initSelection,
  withBottomPadding,
  isVisible,
  multiple,
  onClose,
  onSave,
}) => {
  const {players} = useGetPlayersAndGroups(chat);

  const {
    player,
    search,
    players: playersSelected,
    setPlayer,
    setSearch,
    filteredList,
    handlePressPlayer,
  } = useModalList({
    initSelection,
    selectedPlayers,
    list: players,
    multiple,
  });

  const renderItem = ({item}) => (
    <PlayerItem
      onPress={() => handlePressPlayer(item)}
      item={item}
      rightSide={
        <RadioButton
          onPress={() => handlePressPlayer(item)}
          active={
            multiple
              ? playersSelected.some(p => p.id === item.id)
              : item.id === player?.id
          }
        />
      }
    />
  );

  return (
    <FullModal
      isVisible={isVisible}
      onClose={onClose}
      withBottomPadding={withBottomPadding}>
      <Header
        title="Jugadores"
        rightSide={
          <PressableOpacity onPress={onClose}>
            <Icon name="close" size={25} />
          </PressableOpacity>
        }
      />
      <HDivider />
      {chat && (
        <View style={[t.pX4, t.mT4]}>
          <Text style={[t.fontSans, t.textLg, t.textGray700]}>
            Solo se pueden crear grupos con los jugadores que se haya registrado
            en Padel Pro Manager.
          </Text>
        </View>
      )}
      <View style={[t.flex1, t.pX4]}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          style={[t.mT5]}
          placeholder="Nombre del jugador"
        />
        {filteredList && (
          <View style={[t.flexGrow]}>
            <FlatList
              contentInset={{bottom: 80}}
              ListHeaderComponent={
                <>
                  {withEmpyPlayer && (
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
                  )}
                </>
              }
              showsVerticalScrollIndicator={false}
              data={filteredList}
              renderItem={renderItem}
              keyExtractor={item => item?.id}
              contentContainerStyle={[t.mT3]}
            />
          </View>
        )}
      </View>
      <HDivider />
      <View style={[t.mX4, t.bgWhite, t.pY2]}>
        <Button
          onPress={() => {
            onSave(player || playersSelected);
            setPlayer(null);
            onClose();
          }}
          active
          disabled={
            withEmpyPlayer ? !player && playersSelected?.length === 0 : false
          }
          title="Guardar"
          style={[t.mY3]}
          textStyle={[t.textLg]}
        />
      </View>
    </FullModal>
  );
};
