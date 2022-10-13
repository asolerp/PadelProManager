import React, {useContext, useEffect} from 'react';
import {LoadingModal} from '../Components/Common/LoadingModal';
import {AuthContext} from '../Context/AuthContex';
import {LoadingModalContext} from '../Context/LoadingModalContext';
import {useAuth} from './hooks/useAuth';

import {SignInRouter} from './SignInRouter';
import {SignOutRouter} from './SignOutRouter';

import {useIAPayments} from '../Lib/Payments/hooks/useIAPayments';
import {
  useNotification,
  useRedirectNotification,
} from '../Hooks/useNotifications';
import {useLogout} from '../Hooks/useLogout';

const AuthRouter = () => {
  useAuth();
  useIAPayments();
  useRedirectNotification();
  useNotification();
  const {logout} = useLogout();

  const {isVisible, text} = useContext<any>(LoadingModalContext);
  const {user} = useContext<any>(AuthContext);

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
