import React from 'react';
import {View, Text} from 'react-native';
import {SessionType} from '../../Global/types';
import {useTranslationWrapper} from '../../Hooks/useTranslationsWrapper';

import t from '../../Theme/theme';

import {SessionItem} from './SessionItem';

interface MyTodaySessionsProps {
  sessions: SessionType[];
}

export const MyTodaySessions: React.FC<MyTodaySessionsProps> = ({sessions}) => {
  const {loc} = useTranslationWrapper();

  return (
    <View>
      <Text style={[t.textXl, t.fontSansBold, t.mB2]}>
        {loc('SESSIONS_TITLE')}
      </Text>
      {sessions?.length > 0 ? (
        sessions?.map(session => (
          <View key={session?.id} style={[{marginHorizontal: 2}]}>
            <SessionItem item={session} style={[t.mY2]} />
          </View>
        ))
      ) : (
        <Text style={[t.fontSansMedium, t.textBase]}>
          {loc('SESSION_NOT_TODAY')}
        </Text>
      )}
    </View>
  );
};
