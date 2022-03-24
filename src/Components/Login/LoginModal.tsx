import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';

import {HDivider} from '../UI/HDivider';

import {GoogleButton} from './GoogleButton';

import {useLogin} from '../../Screens/Login/hooks/useLogin';
import {AppleButton} from './AppleButton';
import PressableOpacity from '../UI/PressableOpacity';

export const LoginModal = ({isModalVisible, onBackdropPress}) => {
  const {onGoogleButtonPress, onAppleButtonPress} = useLogin();

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={onBackdropPress}>
      <View style={[t.bgWhite, t.pX6, t.pY4, t.roundedSm]}>
        <View style={[t.wFull]}>
          <Text style={[t.fontSansBold, t.text2xl, t.mB5, t.textCenter]}>
            Accede a tu cuenta
          </Text>
          <PressableOpacity>
            <Text style={[t.fontSansMedium, t.mB3]}>
              He olvidado mi contraseña
            </Text>
          </PressableOpacity>
          <HDivider style={[t.mB3]} />
          <GoogleButton
            onPress={() =>
              onGoogleButtonPress()
                .then(() => console.log('Signed in with Google!'))
                .catch(e => console.log(e))
            }
          />
          <View style={[t.mB3]} />
          <AppleButton
            onPress={() =>
              onAppleButtonPress().then(() =>
                console.log('Signed in with Apple!'),
              )
            }
          />
        </View>
      </View>
    </Modal>
  );
};
