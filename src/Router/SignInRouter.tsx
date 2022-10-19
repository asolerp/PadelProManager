import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainStack} from '../Stacks/MainStack';
import {MAIN_STACK_KEY} from './utils/routerKeys';

const Stack = createNativeStackNavigator();

export const SignInRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MAIN_STACK_KEY}
        component={MainStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
