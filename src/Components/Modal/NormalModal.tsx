import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';

export const NormalModal = ({isVisible, children, onClose}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}>
      <View style={[t.bgWhite, t.p5, t.rounded]}>{children}</View>
    </Modal>
  );
};
