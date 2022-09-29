import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import PressableOpacity from '../UI/PressableOpacity';
import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_SESSION_SCREEN_KEY} from '../../Screens/NewSession/NewSession';

export const SessionSettings = ({sessionId}) => {
  return (
    <>
      <PressableOpacity
        onPress={() =>
          openScreenWithPush(NEW_SESSION_SCREEN_KEY, {session: sessionId})
        }>
        <Icon name="ios-settings-sharp" size={22} />
      </PressableOpacity>
    </>
  );
};
