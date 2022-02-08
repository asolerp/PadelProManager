import React, {useContext} from 'react';
import {LoadingModal} from '../Components/Common/LoadingModal';
import {AuthContext} from '../Context/AuthContex';
import {LoadingModalContext} from '../Context/LoadingModalContext';
import {useAuth} from './hooks/useAuth';

import {SignInRouter} from './SignInRouter';
import {SignOutRouter} from './SignOutRouter';

import {usePayments} from '../Lib/Payments/hooks/usePayments';
import {PremiumModal} from '../Components/Common/PremiumModal';
import {PremiumModalContext} from '../Context/PremiumModalContext';

const AuthRouter = () => {
  useAuth();
  usePayments();

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
      <LoadingModal text={text} isVisible={isVisible} />
      <PremiumModal isVisible={visiblePremiumModal} />
      <SignInRouter />
    </>
  );
};

export default AuthRouter;
