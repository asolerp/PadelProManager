import {useContext} from 'react';
import {AuthContext} from '../../../Context/AuthContex';
import functions from '@react-native-firebase/functions';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {userQuery} from '../../../Api/queries';

export const useValidateReceipt = () => {
  const {user} = useContext(AuthContext);
  const {setText, setIsVisible} = useContext(LoadingModalContext);
  const {updateDocument} = useUpdateDocument(userQuery);

  const invalidateReceipt = () => {
    updateDocument(user?.id, {
      ['status.isSubscribed']: false,
    });
  };

  const validateReceipt = async receipt => {
    const validateFn = functions().httpsCallable('validateReceipt');
    setText('Comprobando suscripción...');
    setIsVisible(true);
    try {
      await validateFn({
        receipt,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisible(false);
    }
  };

  return {
    invalidateReceipt,
    validateReceipt,
  };
};
