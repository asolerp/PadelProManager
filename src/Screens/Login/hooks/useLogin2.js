import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import {useState} from 'react';

const getErrorInfo = code => {
  if (code === 'auth/email-already-in-use') {
    return 'El usuario ya está en uso';
  }

  if (code === 'auth/invalid-email') {
    return 'El email es incorrecto';
  }

  if (code === 'auth/wrong-password') {
    return 'El email o la contraseña son incorrectos';
  }

  if (code === 'auth/weak-password') {
    return 'La contraseña ha de tener letras y números';
  }
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const resetPassword = async email => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (err) {
      console.log(err);
    }
  };

  const errorSetter = err => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const createAccount = async ({email, password1, password2}) => {
    if (password1 !== password2) {
      return errorSetter('Las contraseñas no coinciden');
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password1);
    } catch (err) {
      errorSetter(getErrorInfo(err.code));
    }
  };

  const loginAccount = async ({email, password}) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('ERROR', err);
      errorSetter(getErrorInfo(err.code));
    } finally {
      setLoading(false);
    }
  };

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  }

  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

  return {
    error,
    loading,
    loginAccount,
    createAccount,
    resetPassword,
    onGoogleButtonPress,
    onAppleButtonPress,
  };
};
