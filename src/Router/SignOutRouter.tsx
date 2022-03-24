import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  navigation as navigationRef,
  onNavigatorReady,
  onNavigatorStateChange,
} from './utils/actions';
import RNBootSplash from 'react-native-bootsplash';
import {LoginScreen, LOGIN_SCREEN_KEY} from '../Screens/Login/Login';

const Stack = createNativeStackNavigator();

export const SignOutRouter = () => {
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({fade: true});
    })();
  });
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
