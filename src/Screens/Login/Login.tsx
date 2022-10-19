import React from 'react';

import {Text, View, Image, StatusBar, Platform} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

import {useDeepLinks} from '../../Lib/DeepLinks/hooks/useDeepLinks';

import {SafeAreaView} from 'react-native-safe-area-context';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputLogin} from '../../Components/Login/InputLogin';
import {Spacer} from '../../Components/UI/Spacer';
import {Button} from '../../Components/UI/Button';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {openScreenWithPush} from '../../Router/utils/actions';
import {ROLE_SELECTOR_SCREEN_KEY} from '../../Screens/RoleSelector/RoleSelector';
import {useLogin} from './hooks/useLogin';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import {useKeyboard} from '../../Hooks/useKeyboard';

export const LOGIN_SCREEN_KEY = 'loginScreen';

export const LoginScreen = () => {
  useDeepLinks();

  const {
    logIn,
    email,
    password,
    setEmail,
    setPassword,
    resetPassword,
    visiblePassword,
    handlePressVisiblePassword,
  } = useLogin();

  const {loading} = useFirebaseAuth();
  const {isKeyboardVisible} = useKeyboard();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg isBox={false} backgroundColor="Gray900" opacity={80}>
        <SafeAreaView style={[t.flexGrow, t.pX4]}>
          <KeyboardAwareScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            style={[t.flexCol]}
            contentContainerStyle={[t.flexGrow, t.itemsCenter]}>
            <View style={[t.itemsCenter]}>
              <Image
                resizeMode="contain"
                source={require('../../Assets/logo.png')}
                style={[t.h20, t.mT5]}
              />
            </View>

            <View style={[t.flexGrow, t.justifyCenter]}>
              <Text
                style={[
                  {fontSize: 30},
                  t.fontSansBold,
                  t.textWhite,
                  t.textCenter,
                  t.mT3,
                  t.text4xl,
                ]}>
                Padel Pro Manager
              </Text>
              <View style={[t.border0_5, t.borderWhite, t.flex, t.mY5]} />
              <Text
                style={[
                  t.fontSansMedium,
                  t.textLg,
                  t.textWhite,
                  t.textCenter,
                  t.textXl,
                ]}>
                La aplicación de gestión para entrenadores y jugadores de padel
              </Text>
            </View>

            <View style={[t.justifyEnd, t.wFull, isKeyboardVisible && t.pT10]}>
              <InputLogin
                leftIconName="ios-tennisball-sharp"
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
              />
              <Spacer space={4} />
              <InputLogin
                leftIconName="ios-lock-closed"
                rightIconName={visiblePassword ? 'ios-eye' : 'ios-eye-off'}
                onPressRightIcon={handlePressVisiblePassword}
                secureTextEntry={!visiblePassword}
                placeholder="Contraseña"
                onChangeText={setPassword}
                value={password}
              />
              <Spacer space={2} />
              <PressableOpacity disabled={!email} onPress={resetPassword}>
                <Text
                  style={[
                    !email && t.opacity40,
                    t.fontSans,
                    t.textWhite,
                    t.textXs,
                    t.textRight,
                  ]}>
                  He olvidado mi contraseña
                </Text>
              </PressableOpacity>
              <Spacer space={4} />
              <Button
                loading={loading}
                iconName="ios-log-in"
                onPress={() => logIn()}
                title="LOGIN"
                style={[t.h14, {borderRadius: 20}]}
                textStyle={[t.textSm]}
              />
              <Spacer space={4} />
              <PressableOpacity
                style={[Platform.OS === 'android' && t.pB4]}
                onPress={() => openScreenWithPush(ROLE_SELECTOR_SCREEN_KEY)}>
                <Text style={[t.textCenter, t.textWhite]}>Registrarse</Text>
              </PressableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ContainerWithBg>
    </>
  );
};
