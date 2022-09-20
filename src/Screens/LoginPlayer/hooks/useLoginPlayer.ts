import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '285595276470-73pf20dur3vrnrlmagli0igpijlbh0uq.apps.googleusercontent.com',
});

import {useEffect, useRef, useState} from 'react';

export const useLoginPlayer = ({coachId}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [coach, setCoach] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const loginFormRef = useRef();

  useEffect(() => {
    const getCoachData = async () => {
      const coachQuery = await firestore()
        .collection('users')
        .doc(coachId)
        .get();
      const coachDoc = {id: coachQuery.id, ...coachQuery.data()};
      console.log('COACH DATA', coachDoc);
      setCoach(coachDoc);
    };
    if (coachId) {
      getCoachData();
    }
  }, [coachId]);

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
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    console.log('APPLE', appleCredential);

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

  return {
    coach,
    error,
    loading,
    onGoogleButtonPress,
    onAppleButtonPress,
    setIsLoginModalOpen,
    isLoginModalOpen,
    loginFormRef,
  };
};
