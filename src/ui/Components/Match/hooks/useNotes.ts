import {useState} from 'react';
import {matchQuery} from '../../../Api/queries';

import {useAddDocument} from '../../../Hooks/useAddDocument';
import {useDeleteDocument} from '../../../Hooks/useDeleteDocument';

export const useNotes = matchId => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const notesQuery = matchQuery.doc(matchId).collection('notes');

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
