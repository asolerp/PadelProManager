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

import {usePayments} from '../Lib/Payments/hooks/usePayments';

import {ProfileScreen, PROFILE_SCREEN_KEY} from '../Screens/Profile/Profile';
import {NewPoint, NEW_POINT_SCREEN_KEY} from '../Screens/NewPoint/NewPoint';

const Stack = createNativeStackNavigator();

export const CoachStack = () => {
  usePayments();
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
