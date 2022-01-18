import React, {useState} from 'react';
import {View, Text} from 'react-native';
import t from '../../../Theme/theme';
import {BottomModal} from '../../Modal/BottomModal';
import {Button} from '../../UI/Button';

export const NotesRoute = ({notes}) => {
  const [newNoteModalOpen, setNewNoteModalOpen] = useState(false);
  return (
    <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
      <BottomModal
        isVisible={newNoteModalOpen}
        onClose={() => setNewNoteModalOpen(false)}>
        <Text>Formulario nueva nota</Text>
      </BottomModal>
      {notes.length === 0 && (
        <View style={[t.itemsCenter]}>
          <Text style={[t.mB3]}>No tienes ninguna nota guardada</Text>
          <Button onPress={() => setNewNoteModalOpen(true)}>Añadir nota</Button>
        </View>
      )}
    </View>
  );
};
