import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../Screens/Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {Matches} from '../Screens/Matches/Matches';
import t from '../Theme/theme';
import {View} from 'react-native';
import {Players} from '../Screens/Players/Players';
import {Planner} from '../Screens/Planner/Planner';

const Tab = createBottomTabNavigator();

export const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,

        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
        name="Planner"
        component={Planner}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <View
              style={[t.roundedFull, t.p2, focused ? t.bgBlack : t.bgWhite]}>
              <Icon
                name="ios-calendar"
                size={20}
                color={focused ? 'white' : 'black'}
                focused={focused}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Jugadores"
        component={Players}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <View
              style={[t.roundedFull, t.p2, focused ? t.bgBlack : t.bgWhite]}>
              <Icon
                name="ios-person"
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
        component={Matches}
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
