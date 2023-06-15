import React from 'react';

import {View, Image, StatusBar, Text, Platform} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

// import {useDeepLinks} from '../../Lib/DeepLinks/hooks/useDeepLinks';

import {SafeAreaView} from 'react-native-safe-area-context';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputLogin} from '../../Components/Login/InputLogin';
import {Spacer} from '../../Components/UI/Spacer';
import {Button} from '../../Components/UI/Button';
import {Header} from '../../Components/Layout/Header';

import {useLogin} from '../Login/hooks/useLogin';
import {useFirebaseAuth} from '../../Context/FirebaseContext';

export const REGISTER_SCREEN_KEY = 'registerScreen';

export const Register = () => {
  // useDeepLinks();
  const {
    signIn,
    email,
    password,
    secondPassword,
    setSecondPassword,
    registerEnable,
    setEmail,
    setPassword,
    visiblePassword,
    handlePressVisiblePassword,
  } = useLogin();

  const {loading, firstName, setFirstName, secondName, setSecondName} =
    useFirebaseAuth();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg
        isBox={false}
        backgroundColor="Gray900"
        opacity={80}
        imageSrc="https://res.cloudinary.com/enalbis/image/upload/v1662929406/PadelPro/varios/bgndlhuj3v1drepvw5uz.webp">
        <SafeAreaView style={[t.flexGrow, t.pX4]}>
          <Header withBack mode="dark" />

          <KeyboardAwareScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            style={[t.flexCol]}
            contentContainerStyle={[t.flexGrow, t.itemsCenter]}>
            <View style={[t.justifyCenter, t.itemsCenter]}>
              <Image
                resizeMode="contain"
                source={require('../../Assets/logo.png')}
                style={[t.h10, t.mT5]}
              />
            </View>
            <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
              <Text style={[t.textWhite, t.fontSansBold, t.text4xl]}>
                ¡Llega al siguiente nivel con Padel Pro Manager!
              </Text>
            </View>

            <View style={[t.justifyCenter, t.wFull]}>
              <InputLogin
                autoCapitalize="none"
                placeholder="Nombre"
                onChangeText={setFirstName}
                value={firstName}
              />
              <Spacer space={4} />
              <InputLogin
                autoCapitalize="none"
                placeholder="Apellido"
                onChangeText={setSecondName}
                value={secondName}
              />
              <Spacer space={4} />
              <InputLogin
                leftIconName="ios-mail"
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
              <Spacer space={4} />
              <InputLogin
                leftIconName="ios-lock-closed"
                rightIconName={visiblePassword ? 'ios-eye' : 'ios-eye-off'}
                onPressRightIcon={handlePressVisiblePassword}
                secureTextEntry={!visiblePassword}
                placeholder="Repetir Contraseña"
                onChangeText={setSecondPassword}
                value={secondPassword}
              />
              <Spacer space={4} />
              <Button
                disabled={!registerEnable || !firstName || !secondName}
                loading={loading}
                onPress={() => signIn()}
                title="REGÍSTRATE"
                style={[
                  t.h14,
                  {borderRadius: 20},
                  Platform.OS === 'android' && t.mB5,
                ]}
                textStyle={[t.textSm, t.fontSans]}
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ContainerWithBg>
    </>
  );
};
