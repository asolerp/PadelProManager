import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import {Matches} from '../Screens/Matches/Matches';
import t from '../Theme/theme';
import {View} from 'react-native';

import {HomePlayerScreen} from '../Screens/HomePlayer/HomePlayer';
import {MatchesPlayer} from '../Screens/Matches/MatchesPlayer';

const Tab = createBottomTabNavigator();

export const TabPlayerStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,

        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomePlayerScreen}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <View
              style={[t.roundedFull, t.p2, focused ? t.bgBlack : t.bgWhite]}>
              <Icon
                name="home"
                size={20}
                color={focused ? 'white' : 'black'}
                focused={focused}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Partidos"
        component={MatchesPlayer}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <View
              style={[t.roundedFull, t.p2, focused ? t.bgBlack : t.bgWhite]}>
              <Icon
                name="tennisball"
                size={20}
                color={focused ? 'white' : 'black'}
                focused={focused}
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};
