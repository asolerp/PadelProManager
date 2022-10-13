import React from 'react';

import {Text, View, Image, StatusBar} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

import Icon from 'react-native-vector-icons/Ionicons';
import {useDeepLinks} from '../../Lib/DeepLinks/hooks/useDeepLinks';
import {BlurView} from '@react-native-community/blur';
import {SafeAreaView} from 'react-native-safe-area-context';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {openScreenWithPush} from '../../Router/utils/actions';
import {ROLE_SELECTOR_SCREEN_KEY} from '../RoleSelector/RoleSelector';

export const LOGIN_SCREEN_KEY = 'loginScreen';

export const LoginScreen = () => {
  useDeepLinks();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg isBox={false} backgroundColor="Gray900" opacity={80}>
        <SafeAreaView style={[t.flexGrow, t.pX4]}>
          <View style={[t.flexGrow, t.flexCol, t.itemsCenter]}>
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
                ]}>
                Padel Pro Manager
              </Text>
              <View style={[t.border0_5, t.borderWhite, t.flex, t.mY5]} />
              <Text
                style={[t.fontSansMedium, t.textLg, t.textWhite, t.textCenter]}>
                La aplicación de gestión para entrenadores y jugadores de padel
              </Text>
            </View>
            <View style={[t.itemsCenter, t.justifyCenter, t.mB4]}>
              <BlurView
                blurType="light"
                blurAmount={20}
                reducedTransparencyFallbackColor="white"
                style={[{borderRadius: 30}]}>
                <PressableOpacity
                  onPress={() => openScreenWithPush(ROLE_SELECTOR_SCREEN_KEY)}
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
              </BlurView>
            </View>
          </View>
        </SafeAreaView>
      </ContainerWithBg>
    </>
  );
};
