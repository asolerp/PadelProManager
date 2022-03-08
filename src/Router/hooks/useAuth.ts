import {useEffect, useCallback, useContext} from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Context/AuthContex';
// import Purchases from 'react-native-purchases';

const DEFAULT_PHOTOURL =
  'https://res.cloudinary.com/enalbis/image/upload/v1634766684/Padelia/9861109C-76CA-4EFC-8747-20146A72C02E_1_105_c_e0zjzz.jpg';

const onAuthStateChange = callback => {
  return auth().onAuthStateChanged(async user => {
    if (user) {
      let docRef = firestore().collection('users').doc(user.uid);
      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(async docSnapshot => {
          // let token = await messaging().getToken();
          if (docSnapshot.exists) {
            docRef
              .update({email: user.email})
              .then(() => docRef.get())
              .then(doc => {
                if (doc.exists) {
                  callback({loggedIn: true, id: doc.id, ...doc.data()});
                }
              });
          } else {
            docRef
              .set({
                email: user.email,
                photoURL: user.photoURL || DEFAULT_PHOTOURL,
              })
              .then(() => docRef.get())
              .then(doc => {
                if (doc.exists) {
                  callback({loggedIn: true, id: doc.id, ...doc.data()});
                }
              });
          }
        });
    } else {
      callback({loggedIn: false});
    }
  });
};

export const useAuth = () => {
  const {setUser} = useContext(AuthContext);
  const handleSetUser = useCallback(user => setUser(user), [setUser]);

  useEffect(() => {
    const authSubscriber = onAuthStateChange(handleSetUser);
    return authSubscriber;
  }, []);
};
