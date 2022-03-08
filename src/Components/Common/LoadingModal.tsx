import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import t from '../../Theme/theme';
import {NormalModal} from '../Modal/NormalModal';

interface Props {
  text: string;
  isVisible: boolean;
  onClose?: () => void;
}

export const LoadingModal: React.FC<Props> = ({text, isVisible, onClose}) => {
  return (
    <NormalModal isVisible={isVisible} onClose={onClose}>
      <View style={[t.justifyCenter, t.itemsCenter, t.pX5]}>
        <ActivityIndicator size="large" color="black" style={[t.mB4]} />
        <Text style={[t.fontSansMedium, t.textCenter, t.textBase]}>{text}</Text>
      </View>
    </NormalModal>
  );
};
