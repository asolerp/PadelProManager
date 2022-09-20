import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Matches} from '../Screens/Matches/Matches';
import {HomePlayerScreen} from '../Screens/HomePlayer/HomePlayer';
import t from '../Theme/theme';
import {Text} from 'react-native';

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
            <>
              <Icon
                name={focused ? 'ios-speedometer' : 'ios-speedometer-outline'}
                size={20}
                focused={focused}
              />
              <Text style={[t.fontSans, t.textXs]}>Hoy</Text>
            </>
          ),
        })}
      />

      <Tab.Screen
        name="Partidos"
        component={Matches}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <>
              <Icon
                name={focused ? 'ios-tennisball' : 'ios-tennisball-outline'}
                size={20}
                focused={focused}
              />
              <Text style={[t.fontSans, t.textXs]}>Partidos</Text>
            </>
          ),
        })}
      />
    </Tab.Navigator>
  );
};
