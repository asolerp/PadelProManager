import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PlayerScreen, PLAYER_SCREEN_KEY} from '../Screens/Player/Player';
import {
  NewPlayerScreen,
  NEW_PLAYER_SCREEN_KEY,
} from '../Screens/NewPlayer/NewPlayer';
import {TAB_PLAYER_STACK_KEY} from '../Router/utils/routerKeys';
import {TabPlayerStack} from './TabPlayerStack';
import {MatchScreen, MATCH_SCREEN_KEY} from '../Screens/Match/Match';
import {NewMatchProvider} from '../Context/NewMatchContext';
import {
  NewMatchScreen,
  NEW_MATCH_SCREEN_KEY,
} from '../Screens/NewMatch/NewMatch';
import {NewPoint, NEW_POINT_SCREEN_KEY} from '../Screens/NewPoint/NewPoint';

const Stack = createNativeStackNavigator();

export const PlayerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name={TAB_PLAYER_STACK_KEY}
          component={TabPlayerStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={MATCH_SCREEN_KEY}
          component={MatchScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={NEW_MATCH_SCREEN_KEY}>
          {() => (
            <NewMatchProvider>
              <NewMatchScreen />
            </NewMatchProvider>
          )}
        </Stack.Screen>
        <Stack.Screen
          options={{headerShown: false}}
          name={NEW_PLAYER_SCREEN_KEY}
          component={NewPlayerScreen}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          options={{headerShown: false}}
          name={NEW_POINT_SCREEN_KEY}
          component={NewPoint}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
