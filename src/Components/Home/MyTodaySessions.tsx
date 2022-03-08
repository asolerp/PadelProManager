import React from 'react';
import {View, Text} from 'react-native';

import t from '../../Theme/theme';

import {useGetDaySessions} from './hooks/useGetDaySessions';
import {SessionItem} from './SessionItem';

export const MyTodaySessions = () => {
  const {sessions} = useGetDaySessions();

  return (
    <View>
      <Text style={[t.text2xl, t.fontSansBold, t.mB2]}>
        Mis sesiones de hoy
      </Text>
      {sessions?.length > 0 ? (
        sessions?.map(session => (
          <View key={session?.id} style={[{marginHorizontal: 2}]}>
            <SessionItem item={session} style={[t.mY2]} />
          </View>
        ))
      ) : (
        <Text style={[t.fontSansMedium, t.textBase]}>
          No tienes ningúna sesión para el día de hoy
        </Text>
      )}
    </View>
  );
};
