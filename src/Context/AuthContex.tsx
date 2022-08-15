import React, {createContext, useEffect, useMemo, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {UserType} from '../Global/types';

interface SubscriptionContextInterface {
  isCoach: boolean;
  user?: UserType;
  setUser: React.Dispatch<UserType>;
}

export const AuthContext = createContext<SubscriptionContextInterface>({
  isCoach: false,
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
    isCoach: user?.role === 'coach',
    user,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
