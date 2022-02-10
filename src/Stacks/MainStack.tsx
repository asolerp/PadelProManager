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
import {
  LaunchScreen,
  LAUNCH_SCREEN_KEY,
} from '../Screens/LaunchScreen/LaunchScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
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
