import React, {useContext} from 'react';
import {LoadingModal} from '../Components/Common/LoadingModal';
import {LoadingModalContext} from '../Components/Context/LoadngModalContext';
import SignInRouter from './SignInRouter';

const AuthRouter = () => {
  const {isVisible, text} = useContext(LoadingModalContext);
  return (
    <>
      <LoadingModal text={text} isVisible={isVisible} />
      <SignInRouter />
    </>
  );
};

export default AuthRouter;
