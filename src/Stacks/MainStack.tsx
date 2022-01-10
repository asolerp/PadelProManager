import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, HOME_SCREEN_KEY} from '../Screens/Home/Home';
import {PlayerScreen, PLAYER_SCREEN_KEY} from '../Screens/Player/Player';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={HOME_SCREEN_KEY}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={PLAYER_SCREEN_KEY}
        component={PlayerScreen}
      />
    </Stack.Navigator>
  );
};
