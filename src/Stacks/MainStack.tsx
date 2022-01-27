import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlayerScreen, PLAYER_SCREEN_KEY} from '../Screens/Player/Player';
import {MatchScreen, MATCH_SCREEN_KEY} from '../Screens/Match/Match';
import {TAB_STACK_KEY} from '../Router/utils/routerKeys';
import {TabStack} from './TabStack';
import {
  NewMatchScreen,
  NEW_MATCH_SCREEN_KEY,
} from '../Screens/NewMatch/NewMatch';
import {NewMatchProvider} from '../Components/Context/NewMatchContext';
import {
  NewPlayerScreen,
  NEW_PLAYER_SCREEN_KEY,
} from '../Screens/NewPlayer/NewPlayer';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name={TAB_STACK_KEY}
          component={TabStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={PLAYER_SCREEN_KEY}
          component={PlayerScreen}
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
    </Stack.Navigator>
  );
};
