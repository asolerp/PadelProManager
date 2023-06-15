import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import {useEffect, useRef, useState} from 'react';

import {info, warn} from '../../../Lib/Logging';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

import {PENDING} from '../../../Models/entities';
import {
  removeBlanks,
  removeMultipleBlanks,
} from '../../../Utils/removeMultipleBlanks';

const errorMessage = {
  'auth/user-not-found': 'El email o la contraseña son incorrectos',
  'auth/email-already-exists': 'El usuario ya existe',
  'auth/email-already-in-use': 'El email ya está en uso',
  'auth/invalid-email': 'El email es inválido',
};

export const useLogin = playerEmail => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [secondPassword, setSecondPassword] = useState();
  const [visiblePassword, setVisiblePassword] = useState();
  const {role, firstName, secondName} = useFirebaseAuth();

  const checkNewUserFn = defaultFunctions.httpsCallable('checkNewUser');

  const handlePressVisiblePassword = () => setVisiblePassword(old => !old);

  const loginFormRef = useRef();

  const resetPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      info({
        title: 'Enviado',
        subtitle: 'Ahora podrás restablecer tu contraseña',
      });
    } catch (err) {
      warn({
        title: 'Algo ocurrió..',
        subtitle: 'Lo sentimos, inténtalo más tarde.',
      });
    }
  };

  const logIn = async () => {
    setLoading(true);
    try {
      const response = await auth().signInWithEmailAndPassword(
        removeBlanks(email),
        removeBlanks(password),
      );
      await firestore().collection(PENDING).doc(response?.user?.uid).set({
        email,
      });
      await checkNewUserFn({
        user: {
          uid: response?.user?.uid,
          email: email,
          firstName: firstName,
          secondName: secondName,
        },
        role,
      });
    } catch (err) {
      console.log(err);
      warn({
        title: 'Ha ocurrido algo',
        subtitle: errorMessage[err.code] || 'Inténtelo más tarde',
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await firestore().collection(PENDING).doc(response?.user?.uid).set({
        email,
      });
      await checkNewUserFn({
        user: {
          uid: response?.user?.uid,
          email: email,
          firstName: firstName,
          secondName: secondName,
        },
        role,
      });
    } catch (err) {
      console.log(err);
      warn({
        title: 'Ha ocurrido algo',
        subtitle: errorMessage[err.code] || 'Inténtelo más tarde',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playerEmail) {
      setEmail(playerEmail);
    }
  }, [playerEmail]);

  const registerEnable = email && password && password === secondPassword;

  return {
    logIn,
    signIn,
    email,
    loading,
    setEmail,
    password,
    setPassword,
    resetPassword,
    registerEnable,
    visiblePassword,
    secondPassword,
    setSecondPassword,
    handlePressVisiblePassword,
    setIsLoginModalOpen,
    isLoginModalOpen,
    loginFormRef,
  };
};
