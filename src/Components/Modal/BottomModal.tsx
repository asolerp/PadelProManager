import React from 'react';
import {Dimensions, KeyboardAvoidingView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';
import {HDivider} from '../UI/HDivider';

interface BottomModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  isVisible: boolean;
  swipeDirection?: Array<'down' | 'up' | 'left' | 'right'>;
}

export const BottomModal: React.FC<BottomModalProps> = ({
  title,
  onClose,
  children,
  isVisible,
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
        <View
          style={[
            t.bgWhite,
            t.pY5,
            t.pX5,
            t.roundedTlXl,
            t.roundedTrXl,
            t.pB8,
          ]}>
          <View style={[t.itemsCenter]}>
            <View style={[t.w10, t.h2, t.bgGray200, t.roundedFull, t.mB2]} />
          </View>
          {title && (
            <View>
              <Text style={[t.fontSansBold, t.textXl, t.mB3, t.textCenter]}>
                {title}
              </Text>
              <HDivider />
            </View>
          )}
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
