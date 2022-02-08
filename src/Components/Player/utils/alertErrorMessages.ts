import {Alert} from 'react-native';

export const showError = {
  delete_player: ({onAccept, onCancel}) =>
    Alert.alert(
      'Atención',
      '¿Seguro que quieres eliminar el jugador? Se perderán todos los registros y no se podrá recuperar',
      [
        {
          text: 'Cancel',
          onPress: () => (onCancel ? onCancel() : {}),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onAccept(),
        },
      ],
    ),
};
