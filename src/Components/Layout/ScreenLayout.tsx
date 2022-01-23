import React from 'react';
import {View} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import t from '../../Theme/theme';

interface Props {
  edges?: Edge[];
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<Props> = ({
  edges = ['top', 'left', 'right'],
  children,
}) => {
  return (
    <SafeAreaView edges={edges} style={[t.flex1, t.pX4, t.bgWhite]}>
      <View style={[t.flex1, t.mT3]}>{children}</View>
    </SafeAreaView>
  );
};
