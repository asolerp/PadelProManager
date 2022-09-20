import React, {useContext} from 'react';

import {Text, View, Image, StatusBar} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

import {useLoginPlayer} from './hooks/useLoginPlayer';

import {GoogleButton} from '../../Components/Login/GoogleButton';
import {AppleButton} from '../../Components/Login/AppleButton';
import {Spacer} from '../../Components/UI/Spacer';
import {DynamicLinkContext} from '../../Context/DynamicLinkContext';
import {Avatar} from '../../Components/UI/Avatar';

export const LOGIN_PLAYER_SCREEN_KEY = 'loginPlayerScreen';

export const LoginPlayerScreen = () => {
  const {params} = useContext(DynamicLinkContext);
  const {onGoogleButtonPress, onAppleButtonPress, coach} = useLoginPlayer({
    coachId: params?.coach_id,
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg
        isBox={false}
        backgroundColor="Gray900"
        opacity={90}
        imageSrc="https://res.cloudinary.com/enalbis/image/upload/v1662929406/PadelPro/varios/bgndlhuj3v1drepvw5uz.webp">
        <View style={[t.flexGrow, t.flexCol, t.itemsCenter]}>
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
                El entrenador {coach?.firstName} {coach?.secondName} te invita a
                que formes parte de su equipo de entrenamiento.
              </Text>
              <Text style={[t.fontSans, t.textSm, t.textGray500, t.mT2]}>
                Al formar parte de un equipo de entrenamiento podrás tener un
                seguimiento de tu evolución como jugador y mantenerte comunicado
                con tu entrenador en todo momento.
              </Text>
            </View>
          </View>
          <View style={[t.flexGrow, t.wFull, t.justifyEnd, t.mB4]}>
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
