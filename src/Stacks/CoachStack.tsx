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
import {NewMatchProvider} from '../Context/NewMatchContext';
import {
  NewPlayerScreen,
  NEW_PLAYER_SCREEN_KEY,
} from '../Screens/NewPlayer/NewPlayer';
import {
  PromotionalSubscription,
  PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY,
} from '../Screens/PromotionalSubscription/PromotionalSubscription';

import {EXERCICES_SCREEN_KEY, Exercices} from '../Screens/Exercices/Exercicies';

import {ProfileScreen, PROFILE_SCREEN_KEY} from '../Screens/Profile/Profile';
import {NewPoint, NEW_POINT_SCREEN_KEY} from '../Screens/NewPoint/NewPoint';
import {
  NewSessionScreen,
  NEW_SESSION_SCREEN_KEY,
} from '../Screens/NewSession/NewSession';
import {ProMatch, PRO_MATCH_SCREEN_KEY} from '../Screens/ProMatch/ProMatch';
import {Session, SESSION_SCREEN_KEY} from '../Screens/Session/Session';

const Stack = createNativeStackNavigator();

export const CoachStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <Stack.Group>
        <Stack.Screen
          options={{headerShown: false}}
          name={TAB_STACK_KEY}
          component={TabStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY}
          component={PromotionalSubscription}
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
          name={NEW_POINT_SCREEN_KEY}
          component={NewPoint}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={PRO_MATCH_SCREEN_KEY}
          component={ProMatch}
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
        <Stack.Screen
          options={{headerShown: false}}
          name={PROFILE_SCREEN_KEY}
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={EXERCICES_SCREEN_KEY}
          component={Exercices}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SESSION_SCREEN_KEY}
          component={Session}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name={NEW_SESSION_SCREEN_KEY}
          component={NewSessionScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
