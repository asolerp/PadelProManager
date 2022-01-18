import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useAddDocument} from '../../../Hooks/useAddDocument';
import {useDeleteDocument} from '../../../Hooks/useDeleteDocument';

export const useNotes = matchId => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const notesQuery = firestore()
    .collection('matches')
    .doc(matchId)
    .collection('notes');

  const {addDocument} = useAddDocument(notesQuery);
  const {deleteDocument} = useDeleteDocument(notesQuery);

  const handleDeleteNote = noteId => {
    deleteDocument({docId: noteId});
  };

  const handleSaveNote = callback => {
    addDocument({
      data: {
        title,
        description,
      },
      callback: () => {
        setTitle(null);
        setDescription(null);
        callback();
      },
    });
  };

  const isFormReady = !!title && !!description;

  return {
    title,
    isFormReady,
    description,
    setTitle,
    setDescription,
    handleDeleteNote,
    handleSaveNote,
  };
};
