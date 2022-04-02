import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface BottomModalProps {
  title?: string;
  subtitle?: string;
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
            <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.textXl, t.mY3]}>{title}</Text>
              <Pressable onPress={onClose}>
                <Icon name="close" size={30} />
              </Pressable>
            </View>
          )}
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
