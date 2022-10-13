import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TAB_PLAYER_STACK_KEY} from '../Router/utils/routerKeys';
import {TabPlayerStack} from './TabPlayerStack';
import {MatchScreen, MATCH_SCREEN_KEY} from '../Screens/Match/Match';
import {NewMatchProvider} from '../Context/NewMatchContext';
import {
  NewMatchScreen,
  NEW_MATCH_SCREEN_KEY,
} from '../Screens/NewMatch/NewMatch';
import {NewPoint, NEW_POINT_SCREEN_KEY} from '../Screens/NewPoint/NewPoint';
import {ProfileScreen, PROFILE_SCREEN_KEY} from '../Screens/Profile/Profile';
import {Session, SESSION_SCREEN_KEY} from '../Screens/Session/Session';
import {Chat, CHAT_SCREEN_KEY} from '../Screens/Chat/Chat';
import {ProMatch, PRO_MATCH_SCREEN_KEY} from '../Screens/ProMatch/ProMatch';

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
          name={PROFILE_SCREEN_KEY}
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={PRO_MATCH_SCREEN_KEY}
          component={ProMatch}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SESSION_SCREEN_KEY}
          component={Session}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={CHAT_SCREEN_KEY}
          component={Chat}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name={NEW_POINT_SCREEN_KEY}
          component={NewPoint}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
