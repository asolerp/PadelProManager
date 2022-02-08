import {useContext} from 'react';
import {AuthContext} from '../../../Context/AuthContex';
import functions from '@react-native-firebase/functions';
import {SubscriptionContext} from '../../../Context/SubscriptionContext';

export const useValidateReceipt = () => {
  const {user} = useContext(AuthContext);
  const {setIsChecking} = useContext(SubscriptionContext);

  const validateReceipt = async receipt => {
    const validateFn = functions().httpsCallable('validateReceipt');
    // setIsChecking(true);
    try {
      await validateFn({
        receipt,
        password: 'b9c74702d40b423a9b1f6e3d6d457c22',
      });
    } catch (err) {
      console.log(err);
    } finally {
      //   setIsChecking(false);
    }
  };

  return {
    validateReceipt,
  };
};
