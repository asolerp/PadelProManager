import {useState} from 'react';
import {Alert} from 'react-native';

import {popScreen} from '../../../Router/utils/actions';

import {timeout} from '../../../Utils/timeout';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useDeleteSession = (sessionId, internalId) => {
  const [loading, setLoading] = useState(false);

  const deleteFn = defaultFunctions.httpsCallable('deleteSession');

  const deleteSession = async allEvents => {
    try {
      await timeout(400);
      setLoading(true);
      await deleteFn({
        sessionId,
        internalId,
        allEvents,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      popScreen();
    }
  };

  const handleDeleteSession = () =>
    Alert.alert('Atención', '¿Seguro que quieres eliminar la sesión?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteSession(false);
            popScreen();
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);

  const handleDeleteAllSessions = () =>
    Alert.alert('Atención', '¿Seguro que quieres eliminar la sesión?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Eliminar este evento',
        style: 'default',
        onPress: async () => await deleteSession(false),
      },
      {
        text: 'Eliminar todos los eventos',
        style: 'destructive',
        onPress: async () => await deleteSession(true),
      },
    ]);

  const handleDelete = repDays => {
    repDays.length > 0 ? handleDeleteAllSessions() : handleDeleteSession();
  };

  return {
    handleDelete,
    loading,
  };
};
