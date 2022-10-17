import {Alert} from 'react-native';

export const leaveCoachAlert = ({onAccept}: any) =>
  Alert.alert('Atención', '¿Seguro que quiere dejar a tu entrenador?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Dejar',
      style: 'destructive',
      onPress: () => onAccept(),
    },
  ]);
