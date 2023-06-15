import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../Screens/Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {Matches} from '../Screens/Matches/Matches';
import t from '../Theme/theme';
import {Text} from 'react-native';
import {Players} from '../Screens/Players/Players';
import {Planner} from '../Screens/Planner/Planner';

import {Accounting} from '../Screens/Accounting/Accounting';

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
      {/* <Tab.Screen
        name="Planner"
        component={Planner}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <>
              <Icon
                name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                size={20}
                focused={focused}
              />
              <Text style={[t.fontSans, t.textXs]}>Sesiones</Text>
            </>
          ),
        })}
      />
      <Tab.Screen
        name="Accounting"
        component={Accounting}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <>
              <Icon
                name={focused ? 'ios-receipt-sharp' : 'ios-receipt-outline'}
                size={20}
                focused={focused}
              />
              <Text style={[t.fontSans, t.textXs]}>Contabilidad</Text>
            </>
          ),
        })}
      /> */}
      <Tab.Screen
        name="Jugadores"
        component={Players}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <>
              <Icon
                name={focused ? 'ios-person' : 'ios-person-outline'}
                size={20}
                focused={focused}
              />
              <Text style={[t.fontSans, t.textXs]}>Jugadores</Text>
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
