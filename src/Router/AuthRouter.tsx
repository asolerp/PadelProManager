import React, {useContext, useEffect} from 'react';
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
import {useLogout} from '../Hooks/useLogout';

const AuthRouter = () => {
  useIAPayments();
  useRedirectNotification();
  useNotification();

  const {isVisible, text} = useContext<any>(LoadingModalContext);
  const {logout} = useLogout();
  const {user} = useFirebaseAuth();

  // useEffect(() => {
  //   logout();
  // }, []);

  if (!user) {
    return null;
  }

  if (!user?.loggedIn) {
    return <SignOutRouter />;
  }

  return (
    <>
      {isVisible && <LoadingModal text={text} isVisible={true} />}
      <SignInRouter />
    </>
  );
};

export default AuthRouter;
