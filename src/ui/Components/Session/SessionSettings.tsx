import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import PressableOpacity from '../UI/PressableOpacity';
import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_SESSION_SCREEN_KEY} from '../../Screens/NewSession/NewSession';

export const SessionSettings = ({session}) => {
  return (
    <>
      <PressableOpacity
        onPress={() => openScreenWithPush(NEW_SESSION_SCREEN_KEY, {session})}>
        <Icon name="ios-pencil" size={22} />
      </PressableOpacity>
    </>
  );
};
