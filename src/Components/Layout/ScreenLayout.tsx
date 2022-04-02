import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import t from '../../Theme/theme';

interface Props {
  edges?: Edge[];
  children: React.ReactNode;
  style?: ViewStyle[];
}

export const ScreenLayout: React.FC<Props> = ({
  edges = ['top', 'left', 'right'],
  children,
  style,
}) => {
  return (
    <SafeAreaView edges={edges} style={[t.flex1, t.bgWhite, style]}>
      <View style={[t.flexGrow, t.mT3]}>{children}</View>
    </SafeAreaView>
  );
};
