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
import {
  LoginPlayerScreen,
  LOGIN_PLAYER_SCREEN_KEY,
} from '../Screens/LoginPlayer/LoginPlayer';
import {useDeepLinks} from '../Lib/DeepLinks/hooks/useDeepLinks';
import {
  RoleSelector,
  ROLE_SELECTOR_SCREEN_KEY,
} from '../Screens/RoleSelector/RoleSelector';
import {Register, REGISTER_SCREEN_KEY} from '../Screens/Register/Register';

const Stack = createNativeStackNavigator();

export const SignOutRouter = () => {
  useDeepLinks();
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
        <Stack.Screen
          name={LOGIN_PLAYER_SCREEN_KEY}
          component={LoginPlayerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROLE_SELECTOR_SCREEN_KEY}
          component={RoleSelector}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={REGISTER_SCREEN_KEY}
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
