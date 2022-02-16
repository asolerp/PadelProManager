import {Alert} from 'react-native';
export const infoAlert = {
  finish_match: ({onAccept, onCancel}: any) =>
    Alert.alert('Atención', '¿Seguro que quiere finalizar el partido?', [
      {
        text: 'Cancel',
        onPress: () => onCancel() || {},
        style: 'cancel',
      },
      {
        text: 'Terminar',
        style: 'destructive',
        onPress: () => onAccept(),
      },
    ]),
};

export const showError = {
  delete_match: ({onAccept, onCancel}: any) =>
    Alert.alert(
      'Atención',
      '¿Seguro que quieres eliminar el partido? No se podrá recuperar',
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
