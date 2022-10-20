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
import {PENDING, USERS} from '../Models/entities';

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
    setUser(null);
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
    isCoach: user?.role === Roles.COACH || user?.role === Roles.ADMIN,
    isAdmin: user?.role === Roles.ADMIN,
  };

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
          const userQuery = await firestore()
            .collection(USERS)
            .doc(user?.uid)
            .get();

          const pendingQuery = await firestore()
            .collection(PENDING)
            .doc(user?.uid)
            .get();

          if (userQuery.exists) {
            await firestore().collection(PENDING).doc(user?.uid).delete();
            await firestore().collection(USERS).doc(user?.uid).update({
              token,
              updatedAt: new Date(),
            });
            const response = await firestore()
              .collection(USERS)
              .doc(user?.uid)
              .get();
            const userDoc = {id: response.id, ...response.data()};
            setUser({loggedIn: true, ...userDoc});
          } else {
            if (pendingQuery.exists) {
              setUser({loggedIn: true, id: pendingQuery.id});
              await firestore().collection(PENDING).doc(user?.uid).delete();
            } else {
              setUser(null);
              logout();
            }
          }
        } else {
          cleanFirebaseContext();
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        error({
          title: 'Algo fue mal..',
          subtitle: 'Inténtelo más tarde',
        });
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

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
