import {useContext} from 'react';

import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {userQuery} from '../../../Api/queries';
import {defaultFunctions} from '../../API/firebaseApp';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';

export const useValidateReceipt = () => {
  const {user} = useFirebaseAuth();

  const {setText, setIsVisible} = useContext(LoadingModalContext);
  const {updateDocument} = useUpdateDocument(userQuery);

  const invalidateReceipt = () => {
    updateDocument(user?.id, {
      ['status.isSubscribed']: false,
    });
  };

  const validateReceipt = async receipt => {
    const validateFn = defaultFunctions.httpsCallable('validateReceipt');
    setText('Comprobando suscripción...');
    setIsVisible(true);
    try {
      const result = await validateFn({
        receipt,
      });
      return result?.data;
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
