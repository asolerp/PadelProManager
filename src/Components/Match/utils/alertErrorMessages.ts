import {Alert} from 'react-native';

export const showError = {
  delete_match: ({onAccept, onCancel}) =>
    Alert.alert(
      'Atención',
      '¿Seguro que quieres eliminar el partido? No se podrá recuperar',
      [
        {
          text: 'Cancel',
          onPress: () => onCancel(),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onAccept(),
        },
      ],
    ),
  no_point: () =>
    Alert.alert('Atención', 'No has seleccionado ningún golpe', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]),
  no_player: () =>
    Alert.alert('Atención', 'No has seleccionado ningún jugador', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]),
  no_team: () =>
    Alert.alert('Atención', 'No has marcado que pareja a ganado el punto', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]),
  no_result: () =>
    Alert.alert(
      'Atención',
      'No has seleccionado que tipo de punto a registrar',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    ),
  duplicated_player: () =>
    Alert.alert(
      'Atención',
      'Estadística de jugador ya introducida en este punto',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    ),
  duplicated_result: () =>
    Alert.alert(
      'Atención',
      'No puede haber dos jugadores con el mismo resultado de juego',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
    ),
};
