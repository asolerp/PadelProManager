import React, {useMemo} from 'react';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {createContext} from 'react';
import {useContext} from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {defaultFunctions} from '../Lib/API/firebaseApp';
import {Roles, UserType} from '../Global/types';
import firestore from '@react-native-firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {error} from '../Lib/Logging';
import {useLogout} from '../Hooks/useLogout';

const FirebaseAuthContext = createContext(undefined);

const FirebaseAuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<UserType>();
  const [role, setRole] = useState();
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [loading, setLoading] = useState();
  const {logout} = useLogout();

  const cleanFirebaseContext = () => {
    setRole(null);
    setFirstName(null);
    setSecondName(null);
  };

  const value = {
    user,
    role,
    setUser,
    firstName,
    secondName,
    setFirstName,
    setSecondName,
    cleanFirebaseContext,
    setRole,
    loading,
    isCoach: user?.role === Roles.COACH,
    isAdmin: user?.role === Roles.ADMIN,
  };

  const checkNewUserFn = defaultFunctions.httpsCallable('checkNewUser');

  const query = useMemo(
    () => firestore().collection('users').doc(user?.id),
    [user?.id],
  );

  const [userData] = useDocumentData(query, {
    idField: 'id',
  });

  useEffect(() => {
    if (userData) {
      setUser(oldSate => ({...oldSate, ...userData}));
    }
  }, [userData]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      setLoading(true);
      try {
        let token = await messaging().getToken();
        if (user) {
          console.log({
            user: {
              uid: user.uid,
              email: user?.email,
            },
            firstName,
            secondName,
            role,
            token,
          });
          const response = await checkNewUserFn({
            user: {
              uid: user.uid,
              email: user?.email,
              firstName: firstName || '',
              secondName: secondName || '',
            },
            role,
            token,
          });
          setUser({loggedIn: true, ...response?.data});
        } else {
          setUser({loggedIn: false});
          cleanFirebaseContext();
        }
      } catch (err) {
        error({
          title: 'Algo fue mal..',
          subtitle: 'Inténtelo más tarde',
        });
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [role, firstName, secondName]);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider',
    );
  }
  return context;
}

export {FirebaseAuthProvider, useFirebaseAuth};
