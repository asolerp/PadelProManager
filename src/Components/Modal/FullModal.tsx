import React from 'react';
import {SafeAreaView} from 'react-native';

import Modal from 'react-native-modal';

import t from '../../Theme/theme';

export const FullModal = ({isVisible, children, onClose}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={null}
      style={[t.m0]}>
      <SafeAreaView style={[t.bgWhite, t.flex1]}>{children}</SafeAreaView>
    </Modal>
  );
};
