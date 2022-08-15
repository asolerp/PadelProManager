import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {HDivider} from '../UI/HDivider';

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
      style={[
        t.justifyEnd,
        {
          maxHeight: Dimensions.get('window').height,
        },
        t.m0,
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View style={[t.bgWhite, t.pT3, t.roundedTlLg, t.roundedTrLg, t.pB8]}>
          <View style={[t.flexRow, t.itemsCenter, t.pX4, t.mB4]}>
            <View style={[t.flex1]} />
            <View style={[t.w10, t.h2, t.bgGray200, t.roundedFull]} />
            <Pressable onPress={onClose} style={[t.flex1, t.itemsEnd]}>
              <Icon name="close" size={30} />
            </Pressable>
          </View>
          {title && (
            <View style={[t.mB5, t.pX4]}>
              <Text style={[t.fontSansMedium, t.textLg, t.textCenter]}>
                {title}
              </Text>
            </View>
          )}
          <HDivider />
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
