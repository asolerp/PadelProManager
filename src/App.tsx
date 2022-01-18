import React from 'react';
import type {FunctionComponent} from 'react';

import AuthRouter from './Router/AuthRouter';
import {StatusBar} from 'react-native';

const App: FunctionComponent = () => {
  return (
    <>
      <StatusBar animated={true} barStyle="default" />
      <AuthRouter />
    </>
  );
};

export default App;
