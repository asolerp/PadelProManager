import React from 'react';
import {View, Text, StatusBar} from 'react-native';

import t from '../../Theme/theme';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useLogin} from '../Login/hooks/useLogin';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';

import {openScreenWithPush} from '../../Router/utils/actions';
import {REGISTER_SCREEN_KEY} from '../Register/Register';

import {useFirebaseAuth} from '../../Context/FirebaseContext';
import {Header} from '../../Components/Layout/Header';

export const ROLE_SELECTOR_SCREEN_KEY = 'roleSelectorScreen';

export const RoleSelector = () => {
  const {role, setRole} = useFirebaseAuth();

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
        isBox={false}
        backgroundColor="Gray900"
        opacity={80}
        imageSrc="https://blog.fuertehoteles.com/wp-content/uploads/2016/09/padel-tennis.jpg">
        <SafeAreaView style={[t.pX4, t.flexGrow]}>
          <Header withBack mode="dark" />
          <View style={[t.flexGrow, t.pX1]}>
            <Text style={[t.fontSansBold, t.text5xl, t.textWhite, t.mB5]}>
              ¿Cual es tu rol?
            </Text>
            <Text style={[t.fontSans, t.textLg, t.textWhite, t.textGray200]}>
              Padel Pro Manager sirve tanto para entrenadores como para
              jugadores. A continuación te explicamos que funcionalidades
              incluye cada uno de los roles:
            </Text>
            <View style={[t.mT10, t.flexRow, t.wFull, t.justifyAround]}>
              <View style={[t.itemsCenter]}>
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
              </View>
              <View style={[t.itemsCenter]}>
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
              </View>
            </View>
            <View style={[t.mT10]}>
              {role === 'coach' && (
                <Text
                  style={[t.fontSansMedium, t.textBase, t.textGray400, t.mY3]}>
                  Los entrenadores pueden llevar el seguimiento de muchos
                  jugadores, guardar sus estadísticas de partidos, programar
                  sesiones de entrenamiento, acceder a una biblioteca de
                  ejercicios y muchos más.
                </Text>
              )}
              {role === 'player' && (
                <Text
                  style={[t.fontSansMedium, t.textBase, t.textGray400, t.mY3]}>
                  Los jugadores pueden llevar un control de sus partidos y los
                  gestionados por sus entrenadores y estar en todo momento en
                  concato con su equipo de trabajo.
                </Text>
              )}
            </View>
            <View
              style={[
                t.flexGrow,
                t.itemsCenter,
                t.justifyEnd,
                t.mB4,
                !role && t.opacity40,
              ]}>
              <PressableOpacity
                disabled={!role}
                onPress={() => openScreenWithPush(REGISTER_SCREEN_KEY)}
                style={[
                  t.border0_5,
                  t.borderWhite,
                  t.roundedFull,
                  t.h14,
                  t.w14,
                  t.justifyCenter,
                  t.itemsCenter,
                  t.shadow,
                ]}>
                <Icon name="chevron-forward" size={35} color="white" />
              </PressableOpacity>
            </View>
            {/* <View style={[t.flexGrow, t.justifyEnd]}>
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
            </View> */}
          </View>
        </SafeAreaView>
      </ContainerWithBg>
    </>
  );
};
