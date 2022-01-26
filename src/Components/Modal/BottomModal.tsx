import React from 'react';
import {Dimensions, KeyboardAvoidingView, View} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';

export const BottomModal = ({
  isVisible,
  children,
  onClose,
  swipeDirection = ['down'],
}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={swipeDirection}
      style={[t.justifyEnd, {height: Dimensions.get('screen').height}, t.m0]}>
      <KeyboardAvoidingView behavior="padding">
        <View style={[t.bgWhite, t.pY5, t.pX5, t.roundedTlXl, t.roundedTrXl]}>
          <View style={[t.itemsCenter]}>
            <View style={[t.w20, t.h1, t.bgBlack, t.roundedFull, t.mB5]} />
          </View>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
