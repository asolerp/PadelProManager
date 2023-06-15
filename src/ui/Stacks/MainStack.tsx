import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  LaunchScreen,
  LAUNCH_SCREEN_KEY,
} from '../Screens/LaunchScreen/LaunchScreen';
import {useCheckUserMembership} from '../Hooks/useCheckUserMembership';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  useCheckUserMembership();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={LAUNCH_SCREEN_KEY}
        component={LaunchScreen}
      />
    </Stack.Navigator>
  );
};
