import React, {createContext, useEffect, useMemo, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {Roles, UserType} from '../Global/types';

interface SubscriptionContextInterface {
  isAdmin: boolean;
  isCoach: boolean;
  user?: UserType;
  setUser: React.Dispatch<UserType>;
}

export const AuthContext = createContext<SubscriptionContextInterface>({
  isCoach: false,
  isAdmin: false,
  setUser: () => {},
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState<UserType>();

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

  const value = {
    isAdmin: user?.role === Roles.ADMIN,
    isCoach: user?.role === Roles.COACH || user?.role === Roles.ADMIN,
    user,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
