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
import {TabStack} from './TabStack';

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
        component={TabStack}
        options={{
          drawerIcon: ({color}) => (
            <Icon name={'ios-speedometer-outline'} size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
