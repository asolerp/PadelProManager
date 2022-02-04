import React, {useContext} from 'react';
import {LoadingModal} from '../Components/Common/LoadingModal';
import {AuthContext} from '../Context/AuthContex';
import {LoadingModalContext} from '../Context/LoadngModalContext';
import {useAuth} from './hooks/useAuth';
import {usePayments} from '../Lib/Payments/hooks/usePayments';
import {SignInRouter} from './SignInRouter';
import {SignOutRouter} from './SignOutRouter';
import {SubscriptionProvider} from '../Context/SubscriptionContext';

const AuthRouter = () => {
  useAuth();

  const {isVisible, text} = useContext(LoadingModalContext);
  const {user} = useContext(AuthContext);

  if (!user) {
    return null;
  }

  if (!user?.loggedIn) {
    return <SignOutRouter />;
  }

  return (
    <>
      <LoadingModal text={text} isVisible={isVisible} />
      <SubscriptionProvider>
        <SignInRouter />
      </SubscriptionProvider>
    </>
  );
};

export default AuthRouter;
