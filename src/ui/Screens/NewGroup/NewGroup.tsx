import React, {useState} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {ModalListOfPlayers} from '../../Components/NewMatch/ModalListOfPlayers';
import {ImageSelector} from '../../Components/NewPlayer/ImageSelector';
import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {Input} from '../../Components/UI/Input';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import t from '../../Theme/theme';
import {useCreateGroup} from './hooks/useCreateGroup';

export const NEW_GROUP_SCREEN_KEY = 'newGroup';

export const NewGroup = ({route}) => {
  const groupToEdit = route?.params?.groupToEdit;

  const [isVisible, setIsVisible] = useState();
  const [imageSelected, setImageSelected] = useState();
  const [selectedPlayers, setSelectedPlayers] = useState();
  const {
    handleCreateGroup,
    handleDeleteGroup,
    handleEditGroup,
    response,
    onImagePress,
    groupName,
    setGroupName,
  } = useCreateGroup();

  const handleSavePlayer = players => {
    setSelectedPlayers(players);
  };

  const playersNames = selectedPlayers
    ?.map(p => p.firstName)
    .join()
    .split(',')
    .join(', ');

  useEffect(() => {
    if (groupToEdit) {
      setGroupName(groupToEdit.groupName);
      setSelectedPlayers(groupToEdit.members);
      setImageSelected(groupToEdit.groupImage);
    }
  }, [groupToEdit]);

  return (
    <ScreenLayout edges={['top', 'bottom']}>
      <ModalListOfPlayers
        multiple
        chat
        isVisible={isVisible}
        initSelection={selectedPlayers}
        withEmpyPlayer={false}
        onSave={handleSavePlayer}
        onClose={() => setIsVisible(false)}
      />
      <Header title={groupToEdit ? 'Editar grupo' : 'Crear grupo'} withBack />
      <HDivider style={[t.mB7]} />
      <ImageSelector
        imageSource={imageSelected}
        onImagePress={onImagePress}
        imageSelected={response}
      />
      <View style={[t.pX4, t.mT3, t.flexGrow]}>
        <Input
          placeholder="Nombre del grupo"
          value={groupName}
          onChangeText={setGroupName}
        />
        <PressableOpacity onPress={() => setIsVisible(true)} style={[t.mT2]}>
          <Input
            editable={false}
            placeholder="Jugadores"
            value={playersNames}
          />
        </PressableOpacity>
        <View style={[t.flexGrow, t.justifyEnd]}>
          {groupToEdit ? (
            <>
              <Button
                disabled={!groupName || !selectedPlayers}
                type="error"
                title="Eliminar grupo"
                style={[t.mB2]}
                onPress={() => handleDeleteGroup(groupToEdit.id)}
              />
              <Button
                disabled={!groupName || !selectedPlayers}
                type="info"
                title="Editar grupo"
                active
                onPress={() => handleEditGroup(groupToEdit.id, selectedPlayers)}
              />
            </>
          ) : (
            <Button
              disabled={!groupName || !selectedPlayers}
              type="info"
              title="Crear grupo"
              active
              onPress={() => handleCreateGroup(selectedPlayers)}
            />
          )}
        </View>
      </View>
    </ScreenLayout>
  );
};
