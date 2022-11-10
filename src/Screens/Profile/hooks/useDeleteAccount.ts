import {useContext} from 'react';
import {Alert} from 'react-native';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useLogout} from '../../../Hooks/useLogout';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';
import {timeout} from '../../../Utils/timeout';

export const useDeleteAccount = () => {
  const {logout} = useLogout();
  const deleteAccountFn = defaultFunctions.httpsCallable('deleteAccount');
  const {setIsVisible, setText} = useContext(LoadingModalContext);

  const handleDelete = () => {
    setText('Eliminando cuenta...');
    Alert.alert(
      'Atención',
      '¿Seguro que quieres eliminar tu cuenta? Se perderán todos los registros y no se podrán recuperar',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setIsVisible(true);
            try {
              await deleteAccountFn();
              await timeout(2000);
              await logout();
            } catch (err) {
              console.log(err);
            } finally {
              setIsVisible(false);
            }
          },
        },
      ],
    );
  };

  return {
    handleDelete,
  };
};
