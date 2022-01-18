import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import t from '../../Theme/theme';

interface Props {
  withBack?: boolean;
  title?: string;
  rightSide?: React.ReactNode;
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<Props> = ({children}) => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[t.flex1, t.pX4, t.bgWhite]}>
      <View style={[t.flex1, t.mT3]}>{children}</View>
    </SafeAreaView>
  );
};
