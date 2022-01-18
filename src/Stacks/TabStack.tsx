import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../Screens/Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {Matches} from '../Screens/Matches/Matches';

const Tab = createBottomTabNavigator();

export const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={color}
              focused={focused}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Partidos"
        component={Matches}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="tennisball"
              size={size ? size : 24}
              color={color}
              focused={focused}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
