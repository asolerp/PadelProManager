import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import t from '../../Theme/theme';

interface Props {
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<Props> = ({children}) => {
  return <SafeAreaView style={[t.flex1, t.pX4]}>{children}</SafeAreaView>;
};
