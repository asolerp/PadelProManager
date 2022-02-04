import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  navigation as navigationRef,
  onNavigatorReady,
  onNavigatorStateChange,
} from './utils/actions';

import {LoginScreen, LOGIN_SCREEN_KEY} from '../Screens/Login/Login';

const Stack = createNativeStackNavigator();

export const SignOutRouter = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onNavigatorReady}
      onStateChange={onNavigatorStateChange}>
      <Stack.Navigator>
        <Stack.Screen
          name={LOGIN_SCREEN_KEY}
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
