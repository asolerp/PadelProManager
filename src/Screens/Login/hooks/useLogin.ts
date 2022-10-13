import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Config from 'react-native-config';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'ios' ? Config.CLIENT_ID_IOS : Config.CLIENT_ID_ANDROID,
});

import {useRef, useState} from 'react';
import {Alert, Platform} from 'react-native';

export const useLogin = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const loginFormRef = useRef();

  const onGoogleButtonPress = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
  };

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
    Alert.alert(identityToken);
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

  return {
    onGoogleButtonPress,
    onAppleButtonPress,
    setIsLoginModalOpen,
    isLoginModalOpen,
    loginFormRef,
  };
};
