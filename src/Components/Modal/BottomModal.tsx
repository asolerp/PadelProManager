import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';

export const BottomModal = ({isVisible, children, onClose}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={[t.justifyEnd, t.m0]}>
      <View
        style={[t.bgWhite, t.itemsCenter, t.p5, t.roundedLXl, t.roundedRXl]}>
        <View style={[t.w20, t.h1, t.bgBlack, t.roundedFull, t.mB7]} />
        {children}
      </View>
    </Modal>
  );
};
