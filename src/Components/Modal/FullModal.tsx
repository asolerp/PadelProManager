import React from 'react';

import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
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
      <SafeAreaView style={[t.bgWhite, t.flex1, t.pX5]}>
        {children}
      </SafeAreaView>
    </Modal>
  );
};
