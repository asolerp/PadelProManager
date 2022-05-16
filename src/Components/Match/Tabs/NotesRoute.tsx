import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import t from '../../../Theme/theme';
import {BottomModal} from '../../Modal/BottomModal';
import {Button} from '../../UI/Button';
import {HDivider} from '../../UI/HDivider';
import {Input} from '../../UI/Input';
import {useNotes} from '../hooks/useNotes';
import Icon from 'react-native-vector-icons/Ionicons';
import PressableOpacity from '../../UI/PressableOpacity';

export const NotesRoute = ({notes, matchId}) => {
  const [newNoteModalOpen, setNewNoteModalOpen] = useState(false);
  const {
    title,
    setTitle,
    description,
    isFormReady,
    setDescription,
    handleSaveNote,
    handleDeleteNote,
  } = useNotes(matchId);

  const renderItem = ({item}) => (
    <View style={[t.wFull]}>
      <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB2]}>
        <View style={[t.flex1, t.mR3]}>
          <Text style={[t.fontSansBold, t.textLg, t.mB2]}>{item.title}</Text>
          <Text style={[t.fontSans]}>{item.description}</Text>
        </View>
        <View
          style={[
            t.justifyCenter,
            t.itemsCenter,
            t.bgErrorDark,
            t.rounded,
            t.p2,
          ]}>
          <PressableOpacity onPress={() => handleDeleteNote(item.id)}>
            <Icon name="ios-trash" color="white" size={15} />
          </PressableOpacity>
        </View>
      </View>
      <HDivider style={[t.mB2]} />
    </View>
  );

  return (
    <View style={[t.flexGrow, t.pX3, t.mT5]}>
      <BottomModal
        title="Nueva nota"
        isVisible={newNoteModalOpen}
        onClose={() => setNewNoteModalOpen(false)}>
        <View style={[t.wFull, t.mB3, t.pX4, t.pT4]}>
          <Input
            value={title}
            onChangeText={setTitle}
            label="Título"
            placeholder="Título de la nota"
            style={[t.mB3]}
          />
          <Input
            value={description}
            onChangeText={setDescription}
            label="Descripción"
            multiline
            numberOfLines={4}
            placeholder="Descripción"
            style={[t.mB3]}
          />
          <Button
            disabled={!isFormReady}
            title="Guardar"
            onPress={() => handleSaveNote(() => setNewNoteModalOpen(false))}
            active
            style={[t.mT3]}
            textStyle={[t.textLg]}
          />
        </View>
      </BottomModal>
      {notes.length === 0 && (
        <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
          <Text style={[t.mB3]}>No tienes ninguna nota guardada</Text>
          <Button
            size="sm"
            title="Añadir nota"
            onPress={() => setNewNoteModalOpen(true)}
          />
        </View>
      )}
      {notes?.length > 0 && (
        <View style={[t.justifyCenter, t.flexGrow]}>
          <Button
            title="Nueva nota"
            onPress={() => setNewNoteModalOpen(true)}
            style={[t.mB3, t.w32]}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={notes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
};
