import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar} from 'react-native';

export const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};
