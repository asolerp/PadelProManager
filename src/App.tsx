import React from 'react';
import type {FunctionComponent} from 'react';

import AuthRouter from './Router/AuthRouter';
import {StatusBar} from 'react-native';
import {LoadingModalProvider} from './Components/Context/LoadngModalContext';

const App: FunctionComponent = () => {
  return (
    <>
      <StatusBar animated={true} barStyle="dark-content" />
      <LoadingModalProvider>
        <AuthRouter />
      </LoadingModalProvider>
    </>
  );
};

export default App;
