import {useEffect, useCallback, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Context/AuthContex';
import {DynamicLinkContext} from '../../Context/DynamicLinkContext';
import {emptyStats} from '../../Screens/NewPlayer/utils/emptyStats';
import {LoadingModalContext} from '../../Context/LoadingModalContext';

const DEFAULT_PHOTOURL =
  'https://res.cloudinary.com/enalbis/image/upload/v1634766684/Padelia/9861109C-76CA-4EFC-8747-20146A72C02E_1_105_c_e0zjzz.jpg';

const onAuthStateChange = (params, callback, setIsVisible) => {
  return auth().onAuthStateChanged(async user => {
    setIsVisible(true);
    try {
      let token = await messaging().getToken();

      if (user) {
        let docRef = firestore().collection('users');
        const userQuery = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        if (userQuery.exists) {
          return await docRef.doc(user.uid).update({token});
        }

        await docRef.doc(user.uid).set({
          email: user.email,
          role: params?.coach_id ? 'player' : 'coach',
          coachId: params?.coach_id || '',
          token,
          photoURL: user.photoURL || DEFAULT_PHOTOURL,
        });

        await docRef
          .doc(user.uid)
          .collection('stats')
          .doc('global')
          .set({...emptyStats});
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (user) {
        let docQuery = await firestore()
          .collection('users')
          .doc(user?.uid)
          .get();

        callback({loggedIn: true, id: docQuery.id, ...docQuery.data()});
      } else {
        callback({loggedIn: false});
      }
      setIsVisible(false);
    }
  });
};

export const useAuth = () => {
  const {setUser} = useContext(AuthContext);
  const {params} = useContext(DynamicLinkContext);
  const {setIsVisible} = useContext(LoadingModalContext);
  const handleSetUser = useCallback(user => setUser(user), [setUser]);

  useEffect(() => {
    const authSubscriber = onAuthStateChange(
      params,
      handleSetUser,
      setIsVisible,
    );
    return authSubscriber;
  }, []);
};
