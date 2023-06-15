import React, {useContext} from 'react';

import {Text, View, Image, StatusBar, KeyboardAvoidingView} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

import {useGetCoach} from './hooks/useGetCoach';

import {DynamicLinkContext} from '../../Context/DynamicLinkContext';
import {Avatar} from '../../Components/UI/Avatar';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Spacer} from '../../Components/UI/Spacer';
import {Button} from '../../Components/UI/Button';
import {InputLogin} from '../../Components/Login/InputLogin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useLogin} from '../Login/hooks/useLogin';
import {useFirebaseAuth} from '../../Context/FirebaseContext';

export const LOGIN_PLAYER_SCREEN_KEY = 'loginPlayerScreen';

export const LoginPlayerScreen = () => {
  const {params} = useContext(DynamicLinkContext);
  const {coach} = useGetCoach({
    coachId: params?.coach_id,
  });
  const {
    email,
    signIn,
    password,
    setEmail,
    setPassword,
    visiblePassword,
    handlePressVisiblePassword,
  } = useLogin(params?.player_email);

  const {loading} = useFirebaseAuth();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg
        isBox={false}
        backgroundColor="Gray900"
        opacity={90}
        imageSrc="https://res.cloudinary.com/enalbis/image/upload/v1662929406/PadelPro/varios/bgndlhuj3v1drepvw5uz.webp">
        <SafeAreaView style={[t.flexGrow, t.pX4]}>
          <KeyboardAwareScrollView
            style={[t.flexCol]}
            contentContainerStyle={[t.flexGrow]}>
            <View style={[t.justifyCenter, t.itemsCenter]}>
              <Image
                resizeMode="contain"
                source={require('../../Assets/logo.png')}
                style={[t.h8, t.mT5]}
              />
            </View>
            <View style={[t.wFull, t.mT5]}>
              <Text style={[t.text4xl, t.textWhite, t.fontSansBold]}>
                Bienvenido a Padel Pro Manager!
              </Text>
            </View>
            <View>
              <View style={[t.itemsCenter, t.mT10]}>
                <Avatar
                  img={coach?.profileImg}
                  imageStyle={[t.w28, t.h28]}
                  style={[t.border0_5, t.borderWhite, t.roundedFull]}
                />
              </View>
              <View style={[t.mT5]}>
                <Text style={[t.fontSans, t.textXl, t.textWhite]}>
                  El entrenador {coach?.firstName} {coach?.secondName} te invita
                  a que formes parte de su equipo de entrenamiento.
                </Text>
                <Text style={[t.fontSans, t.textSm, t.textGray500, t.mT2]}>
                  Al formar parte de un equipo de entrenamiento podrás tener un
                  seguimiento de tu evolución como jugador y mantenerte
                  comunicado con tu entrenador en todo momento.
                </Text>
              </View>
            </View>
            <View style={[t.flexGrow, t.wFull, t.justifyEnd]}>
              <InputLogin
                editable={false}
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
              <Spacer space={4} />
              <Button
                loading={loading}
                onPress={() => signIn()}
                title="REGISTRARSE"
                style={[t.h14, {borderRadius: 20}]}
                textStyle={[t.textSm]}
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ContainerWithBg>
    </>
  );
};
