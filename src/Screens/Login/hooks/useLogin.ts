import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'ios' ? Config.CLIENT_ID_IOS : Config.CLIENT_ID_ANDROID,
});

import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {info, warn} from '../../../Lib/Logging';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

const errorMessage = {
  'auth/email-already-exists': 'El usuario ya existe',
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
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('RESPONSE', response.user.uid);
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
      warn({
        title: 'Ha ocurrido algo',
        subtitle: errorMessage[err.code] || 'Inténtelo más tarde',
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    console.log(email, password);
    setLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
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
      warn({
        title: 'Ha ocurrido algo',
        subtitle: errorMessage[err.code] || 'Inténtelo más tarde',
      });
    } finally {
      setLoading(false);
    }
  };

  // const onGoogleButtonPress = async () => {
  //   try {
  //     const {idToken} = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     await auth().signInWithCredential(googleCredential);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // async function onAppleButtonPress() {
  //   // Start the sign-in request
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });

  //   // Ensure Apple returned a user identityToken
  //   if (!appleAuthRequestResponse.identityToken) {
  //     throw 'Apple Sign-In failed - no identify token returned';
  //   }

  //   // Create a Firebase credential from the response
  //   const {identityToken, nonce} = appleAuthRequestResponse;
  //   const appleCredential = auth.AppleAuthProvider.credential(
  //     identityToken,
  //     nonce,
  //   );

  //   console.log('LOGIN', appleCredential);

  //   // Sign the user in with the credential
  //   return auth().signInWithCredential(appleCredential);
  // }

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
    // onGoogleButtonPress,
    // onAppleButtonPress,
    setIsLoginModalOpen,
    isLoginModalOpen,
    loginFormRef,
  };
};
