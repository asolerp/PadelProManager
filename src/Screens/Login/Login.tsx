import React from 'react';

import {Text, View, Image} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

import {useLogin} from './hooks/useLogin';
import {Button} from '../../Components/UI/Button';
import {LoginModal} from '../../Components/Login/LoginModal';

export const LOGIN_SCREEN_KEY = 'loginScreen';

export const LoginScreen = () => {
  const {isLoginModalOpen, setIsLoginModalOpen} = useLogin();

  return (
    <>
      <LoginModal
        isModalVisible={isLoginModalOpen}
        onBackdropPress={() => setIsLoginModalOpen(false)}
      />
      <ContainerWithBg backgroundColor="Gray900" opacity={80}>
        <View style={[t.flexGrow, t.flexCol, t.itemsCenter]}>
          <Image
            resizeMode="contain"
            source={require('../../Assets/logo_white.png')}
            style={[t.h14]}
          />
          <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
            <Text
              style={[
                t.fontSansBold,
                t.text3xl,
                t.textWhite,
                t.textCenter,
                t.mB3,
              ]}>
              HERRAMIENTA PROFESIONAL PARA ENTRENADORES Y JUGADORES
            </Text>
            <Text style={[t.fontSans, t.textLg, t.textWhite, t.textCenter]}>
              NUESTROS PUNTOS DÉBILES SE PUEDEN CONVERTIR EN PUNTOS GANADORES
            </Text>
          </View>
          <View style={[t.wFull, t.justifyEnd]}>
            <Button
              title="Acceder"
              type="white"
              onPress={() => setIsLoginModalOpen(true)}
              active
              style={[t.mB3]}
              size="lg"
              textStyle={[t.textGray900]}
            />
          </View>
        </View>
      </ContainerWithBg>
    </>
  );
};
