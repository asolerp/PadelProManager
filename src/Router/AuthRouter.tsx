import React, {useContext} from 'react';
import {LoadingModal} from '../Components/Common/LoadingModal';
import {AuthContext} from '../Context/AuthContex';
import {LoadingModalContext} from '../Context/LoadingModalContext';
import {useAuth} from './hooks/useAuth';

import {SignInRouter} from './SignInRouter';
import {SignOutRouter} from './SignOutRouter';

import {PremiumModal} from '../Components/Common/PremiumModal';
import {PremiumModalContext} from '../Context/PremiumModalContext';
import {useIAPayments} from '../Lib/Payments/hooks/useIAPayments';
import {useNotification} from '../Hooks/useNotifications';

const AuthRouter = () => {
  useAuth();
  useIAPayments();
  useNotification();

  const {isVisible, text} = useContext(LoadingModalContext);
  const {isVisible: visiblePremiumModal} = useContext(PremiumModalContext);
  const {user} = useContext(AuthContext);

  if (!user) {
    return null;
  }

  if (!user?.loggedIn) {
    return <SignOutRouter />;
  }

  return (
    <>
      {isVisible && <LoadingModal text={text} isVisible={true} />}
      <PremiumModal isVisible={visiblePremiumModal} />
      <SignInRouter />
    </>
  );
};

export default AuthRouter;
