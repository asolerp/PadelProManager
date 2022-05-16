import React from 'react';

import {Text, View, Image, StatusBar} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

import {useLogin} from './hooks/useLogin';

import {GoogleButton} from '../../Components/Login/GoogleButton';
import {AppleButton} from '../../Components/Login/AppleButton';
import {Spacer} from '../../Components/UI/Spacer';

export const LOGIN_SCREEN_KEY = 'loginScreen';

export const LoginScreen = () => {
  const {onGoogleButtonPress, onAppleButtonPress} = useLogin();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg isBox={false} backgroundColor="Gray900" opacity={80}>
        <View style={[t.flexGrow, t.flexCol, t.itemsCenter]}>
          <Text
            style={[
              t.fontSansBold,
              t.text2xl,
              t.textWhite,
              t.textCenter,
              t.mT3,
            ]}>
            Padel Pro Manager
          </Text>
          <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
            <Image
              resizeMode="contain"
              source={require('../../Assets/logo.png')}
              style={[t.h20, t.mT5]}
            />
          </View>
          <View style={[t.wFull, t.justifyEnd, t.mB4]}>
            <GoogleButton
              onPress={() =>
                onGoogleButtonPress()
                  .then(() => console.log('Signed in with Google!'))
                  .catch(e => console.log(e))
              }
            />
            <Spacer space={3} />
            <AppleButton
              onPress={() =>
                onAppleButtonPress().then(() =>
                  console.log('Signed in with Apple!'),
                )
              }
            />
          </View>
        </View>
      </ContainerWithBg>
    </>
  );
};
