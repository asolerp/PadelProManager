import {useEffect, useCallback, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {AuthContext} from '../../Context/AuthContex';

import {LoadingModalContext} from '../../Context/LoadingModalContext';
import {defaultFunctions} from '../../Lib/API/firebaseApp';
import {RoleContext} from '../../Context/RoleContext';

const onAuthStateChange = (role, callback, setIsVisible) => {
  const checkNewUserFn = defaultFunctions.httpsCallable('checkNewUser');

  return auth().onAuthStateChanged(async user => {
    setIsVisible(true);
    try {
      let token = await messaging().getToken();
      console.log('USER', user);
      if (user) {
        const response = await checkNewUserFn({
          user: {
            uid: user.uid,
            email: user?.email,
          },
          role,
          token,
        });
        console.log('RESPONSE', response.data);
        callback({loggedIn: true, ...response?.data});
      } else {
        console.log('Limpiando');
        callback({loggedIn: false});
      }
      setIsVisible(false);
    } catch (err) {
      console.log(err);
      // error({
      //   title: 'Lo sentimos',
      //   subtitle: 'Vúelvelo a intentar más tarde',
      // });
    }
  });
};

export const useAuth = () => {
  const {setUser} = useContext(AuthContext);

  const {role} = useContext(RoleContext);
  const {setIsVisible} = useContext(LoadingModalContext);
  const handleSetUser = useCallback(user => setUser(user), [setUser]);

  useEffect(() => {
    const authSubscriber = onAuthStateChange(role, handleSetUser, setIsVisible);
    return authSubscriber;
  }, []);
};
