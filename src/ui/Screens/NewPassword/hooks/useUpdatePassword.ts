import auth from '@react-native-firebase/auth';
import {info} from '../../../Lib/Logging';

export const useUpdatePassword = () => {
  const reauthenticate = currentPassword => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const handleUpdatePassword = async (currentPass, newPass) => {
    try {
      reauthenticate(currentPass)
        .then(() => {
          let user = auth().currentUser;
          user
            .updatePassword(newPass)
            .then(() => {
              info({
                title: 'Actualizción correcta',
                subtitle: 'Se ha actualizado la contraseña correctamente',
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    handleUpdatePassword,
  };
};
