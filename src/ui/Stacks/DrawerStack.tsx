import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../Screens/Home/Home';

import {Matches} from '../Screens/Matches/Matches';

import {Players} from '../Screens/Players/Players';
import {Planner} from '../Screens/Planner/Planner';

import {Accounting} from '../Screens/Accounting/Accounting';
import {CustomDrawer} from '../Components/Drawer/CustomDrawer';

import Icon from 'react-native-vector-icons/Ionicons';
import t from '../Theme/theme';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: t.bgGray700.backgroundColor,
        drawerActiveTintColor: t.textWhite.color,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: t.fontSansMedium.fontFamily,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Icon name={'ios-speedometer-outline'} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sesiones"
        component={Planner}
        options={{
          drawerIcon: ({color}) => (
            <Icon name={'ios-calendar-outline'} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contabilidad"
        component={Accounting}
        options={{
          drawerIcon: ({color}) => (
            <Icon name={'ios-receipt-outline'} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Jugadores"
        component={Players}
        options={{
          drawerIcon: ({color}) => (
            <Icon name={'ios-person-outline'} size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Partidos"
        component={Matches}
        options={{
          drawerIcon: ({color}) => (
            <Icon name={'ios-tennisball-outline'} size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
