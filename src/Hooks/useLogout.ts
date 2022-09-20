import auth from '@react-native-firebase/auth';
import {useContext} from 'react';
import {DynamicLinkContext} from '../Context/DynamicLinkContext';
// import Purchases from 'react-native-purchases';

export const useLogout = () => {
  const {setParams} = useContext(DynamicLinkContext);

  const logout = async () => {
    try {
      await auth().signOut();
      // await Purchases.logOut();
    } catch (err) {
      console.log(err);
    } finally {
      setParams({});
    }
  };

  return {
    logout,
  };
};
