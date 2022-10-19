import React, {useContext} from 'react';
import {LoadingModal} from '../Components/Common/LoadingModal';

import {LoadingModalContext} from '../Context/LoadingModalContext';

import {SignInRouter} from './SignInRouter';
import {SignOutRouter} from './SignOutRouter';

import {useIAPayments} from '../Lib/Payments/hooks/useIAPayments';
import {
  useNotification,
  useRedirectNotification,
} from '../Hooks/useNotifications';
import {useFirebaseAuth} from '../Context/FirebaseContext';

import {
  navigation as navigationRef,
  onNavigatorReady,
  onNavigatorStateChange,
} from './utils/actions';
import {NavigationContainer} from '@react-navigation/native';
import {LoadingPage} from '../Screens/LoadingPage/LoadingPage';

const AuthRouter = () => {
  useIAPayments();
  useRedirectNotification();
  useNotification();

  const {isVisible, text} = useContext<any>(LoadingModalContext);

  const {user, loading} = useFirebaseAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onNavigatorReady}
      onStateChange={onNavigatorStateChange}>
      {isVisible && <LoadingModal text={text} isVisible={true} />}
      {!user?.loggedIn ? <SignOutRouter /> : <SignInRouter />}
    </NavigationContainer>
  );
};

export default AuthRouter;
