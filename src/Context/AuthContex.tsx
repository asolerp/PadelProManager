import React, {createContext, useEffect, useMemo, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {userQuery} from '../Api/queries';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();

  const query = useMemo(
    () => firestore().collection('users').doc(user?.id),
    [user?.id],
  );

  const [userData] = useDocumentData(query, {
    idField: 'id',
  });

  useEffect(() => {
    if (userData) {
      setUser({...user, ...userData});
    }
  }, [userData]);

  const value = {
    user,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
