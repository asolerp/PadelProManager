import auth from '@react-native-firebase/auth';
import Purchases from 'react-native-purchases';

export const useLogout = () => {
  const logout = async () => {
    try {
      await auth().signOut();
      await Purchases.logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logout,
  };
};
