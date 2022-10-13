import React, {useContext, useState} from 'react';
import {View, Text, Pressable, StatusBar} from 'react-native';

import t from '../../Theme/theme';

import {useSetUserRole} from './hooks/useSetUserRole';
import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import {Button} from '../../Components/UI/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GoogleButton} from '../../Components/Login/GoogleButton';
import {AppleButton} from '../../Components/Login/AppleButton';
import {Spacer} from '../../Components/UI/Spacer';
import {useLogin} from '../Login/hooks/useLogin';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {RoleContext} from '../../Context/RoleContext';

export const ROLE_SELECTOR_SCREEN_KEY = 'roleSelectorScreen';

export const RoleSelector = () => {
  const {onGoogleButtonPress, onAppleButtonPress} = useLogin();
  const {role, setRole} = useContext(RoleContext);

  const handlePressRole = r => {
    if (role === r) {
      return setRole(null);
    }
    setRole(r);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg
        opacity={80}
        backgroundColor="black"
        imageSrc="https://blog.fuertehoteles.com/wp-content/uploads/2016/09/padel-tennis.jpg">
        <SafeAreaView style={[t.pX4, t.flexGrow]}>
          <View style={[t.flexGrow, t.pX1]}>
            <Text style={[t.fontSansBold, t.text5xl, t.textWhite, t.mB5]}>
              ¿Cual es tu rol?
            </Text>
            <Text
              style={[t.fontSansBold, t.textLg, t.textWhite, t.textGray400]}>
              Padel Pro Manager sirve tanto para entrenadores como para
              jugadores. A continuación te explicamos que funcionalidades
              incluye cada uno de los roles:
            </Text>
            <View style={[t.mT10, t.flexRow, t.wFull, t.justifyAround]}>
              <View style={[t.itemsCenter]}>
                <BlurView
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                  style={[t.roundedSm]}>
                  <PressableOpacity
                    style={[
                      role === 'coach' && t.bgWhite,
                      t.itemsCenter,
                      t.borderWhite,
                      t.justifyCenter,
                      {borderWidth: 2},
                      t.p2,
                      t.roundedSm,
                      t.w40,
                      t.h40,
                    ]}
                    onPress={() => handlePressRole('coach')}>
                    <Text
                      style={[
                        t.fontSansMedium,
                        t.textBase,
                        role === 'coach' ? t.textGray700 : t.textWhite,
                        t.mY3,
                      ]}>
                      ENTRENADOR
                    </Text>
                  </PressableOpacity>
                </BlurView>
              </View>
              <View style={[t.itemsCenter]}>
                <BlurView
                  blurType="light"
                  blurAmount={5}
                  reducedTransparencyFallbackColor="white"
                  style={[t.roundedSm]}>
                  <PressableOpacity
                    style={[
                      role === 'player' && t.bgWhite,
                      t.itemsCenter,
                      t.justifyCenter,
                      t.borderWhite,
                      {borderWidth: 2},
                      t.p2,
                      t.roundedSm,
                      t.w40,
                      t.h40,
                    ]}
                    onPress={() => handlePressRole('player')}>
                    <Text
                      style={[
                        t.fontSansMedium,
                        t.textBase,
                        role === 'player' ? t.textGray700 : t.textWhite,
                        t.mY3,
                      ]}>
                      JUGADOR
                    </Text>
                  </PressableOpacity>
                </BlurView>
              </View>
            </View>
            <View style={[t.mT10]}>
              {role === 'coach' && (
                <Text
                  style={[t.fontSansMedium, t.textBase, t.textGray400, t.mY3]}>
                  Los entrenadores pueden llevar el seguimiento de muchos
                  jugadores, guardar sus estadísticas de partidos, programar
                  sesiones de entrenamiento y acceder a una biblioteca de
                  ejercicios.
                </Text>
              )}
              {role === 'player' && (
                <Text
                  style={[t.fontSansMedium, t.textBase, t.textGray400, t.mY3]}>
                  Los jugadores pueden llevar un control de sus partidos y los
                  gestionados por sus entrenadores.
                </Text>
              )}
            </View>
            <View style={[t.flexGrow, t.justifyEnd]}>
              <BlurView
                blurType="light"
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
                style={[
                  !role && t.opacity40,
                  t.flexRow,
                  t.h14,
                  t.border0_5,
                  t.borderWhite,
                  t.roundedSm,
                ]}>
                <PressableOpacity
                  disabled={!role}
                  onPress={() =>
                    onGoogleButtonPress()
                      .then(() => console.log('Signed in with Google!'))
                      .catch(e => console.log(e))
                  }
                  style={[t.flexGrow, t.itemsCenter, t.justifyCenter]}>
                  <Icon name="logo-google" size={25} color="white" />
                </PressableOpacity>
                <View style={[t.hFull, t.w1, t.border0_5, t.borderWhite]} />
                <PressableOpacity
                  disabled={!role}
                  onPress={() =>
                    onAppleButtonPress().then(() =>
                      console.log('Signed in with Apple!'),
                    )
                  }
                  style={[t.flexGrow, t.itemsCenter, t.justifyCenter]}>
                  <Icon name="logo-apple" size={25} color="white" />
                </PressableOpacity>
              </BlurView>
            </View>
          </View>
        </SafeAreaView>
      </ContainerWithBg>
    </>
  );
};
