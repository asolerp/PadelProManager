import React from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';
import {useGetPlayers} from '../../Hooks/useGetPlayers';
import t from '../../Theme/theme';
import {FullModal} from '../Modal/FullModal';
import {HDivider} from '../UI/HDivider';
import {Avatar} from '../UI/Avatar';
import {RadioButton} from '../UI/RadioButton';
import {Button} from '../UI/Button';
import {Header} from '../Layout/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from '../UI/Input';
import {useModalList} from './hooks/useModalList';

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
    <View style={[t.mB3]}>
      <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB2]}>
        <View style={[t.flexRow]}>
          <Avatar img={item.profileImg} style={[t.mR3]} />
          <View style={[t.justifyCenter]}>
            <Text style={[t.fontSansMedium, t.textBase]}>
              {item.firstName} {item.secondName}
            </Text>
            <Text style={[t.fontSansMedium, t.textXs, t.opacity60]}>
              Diestro / 3ª Categoría{' '}
            </Text>
          </View>
        </View>
        <RadioButton
          onPress={() => handlePressPlayer(item)}
          active={item.id === player?.id}
        />
      </View>
      <HDivider />
    </View>
  );

  return (
    <FullModal isVisible={isVisible} onClose={onClose}>
      <Header
        title="Jugadores"
        rightSide={
          <Pressable onPress={onClose}>
            <Icon name="close" size={25} />
          </Pressable>
        }
      />
      <Input
        placeholder="Nombre del jugador"
        value={search}
        onChangeText={setSearch}
      />
      {filteredList?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={[t.flex1, t.mT8]}
        />
      ) : (
        <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
          <Text style={[t.fontSans]}>
            No tienes más jugadores para seleccionar
          </Text>
        </View>
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
