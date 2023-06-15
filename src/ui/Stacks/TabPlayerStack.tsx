import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Matches} from '../Screens/Matches/Matches';
import {HomePlayerScreen} from '../Screens/HomePlayer/HomePlayer';
import t from '../Theme/theme';
import {Text, View} from 'react-native';
import {Messages} from '../Screens/Messages/Messages';
import {useGetNoReadMessages} from '../Hooks/useGetNoReadMessages';

import {useFirebaseAuth} from '../Context/FirebaseContext';
import {OpenSessions} from '../Screens/OpenSessions/OpenSessions';
import {Planner} from '../Screens/Planner/Planner';

const Tab = createBottomTabNavigator();

export const TabPlayerStack = () => {
  const {noReadMessages} = useGetNoReadMessages();
  const {user} = useFirebaseAuth();

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
              <Text style={[t.fontSans, t.textXs]}>Panel</Text>
            </>
          ),
        })}
      />
      <Tab.Screen
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
      {user?.coachId && (
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={() => ({
            tabBarIcon: ({focused}) => (
              <View style={[t.relative, t.itemsCenter, t.justifyCenter]}>
                {noReadMessages && (
                  <View
                    style={[
                      t.absolute,
                      t.w3,
                      t.h3,
                      t.roundedFull,
                      t.bgErrorDark,
                      t._top0_5,
                      t.right3,
                      t.z50,
                    ]}
                  />
                )}
                <Icon
                  name={
                    focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
                  }
                  size={20}
                  focused={focused}
                />
                <Text style={[t.fontSans, t.textXs]}>Mensajes</Text>
              </View>
            ),
          })}
        />
      )}

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
