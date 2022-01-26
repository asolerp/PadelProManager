import React from 'react';
import type {FunctionComponent} from 'react';

import AuthRouter from './Router/AuthRouter';
import {StatusBar} from 'react-native';

const App: FunctionComponent = () => {
  return (
    <>
      <StatusBar animated={true} barStyle="dark-content" />
      <AuthRouter />
    </>
  );
};

export default App;
