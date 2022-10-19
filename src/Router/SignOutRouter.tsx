import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

export const SIGN_OUT_ROUTER_STACK_KEY = 'signOutRouterStack';

const Stack = createNativeStackNavigator();

export const SignOutRouter = () => {
  useDeepLinks();
  useEffect(() => {
    (async () => {
      await RNBootSplash.hide({fade: true});
    })();
  });
  return (
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
  );
};
