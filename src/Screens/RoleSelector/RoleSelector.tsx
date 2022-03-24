import React, {useState} from 'react';
import {View, Text, Pressable, StatusBar} from 'react-native';

import t from '../../Theme/theme';

import {useSetUserRole} from './hooks/useSetUserRole';
import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import {Button} from '../../Components/UI/Button';

export const RoleSelector = () => {
  const {handleUpdateRole} = useSetUserRole();
  const [role, setRole] = useState();

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
        <View style={[t.flexGrow, t.pX1]}>
          <Text style={[t.fontSansBold, t.text5xl, t.textWhite, t.mB5]}>
            ¿Cual es tu rol?
          </Text>
          <Text style={[t.fontSansBold, t.textLg, t.textWhite, t.textGray400]}>
            Padel Pro Manager sirve tanto para entrenadores como para jugadores.
            A continuación te explicamos que funcionalidades incluye cada uno de
            los roles:
          </Text>
          <View style={[t.mT10, t.flexRow, t.wFull, t.justifyAround]}>
            <View style={[t.itemsCenter]}>
              <Pressable
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
              </Pressable>
            </View>
            <View style={[t.itemsCenter]}>
              <Pressable
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
              </Pressable>
            </View>
          </View>
          <View style={[t.mT10]}>
            {role === 'coach' && (
              <Text
                style={[t.fontSansMedium, t.textBase, t.textGray400, t.mY3]}>
                Los entrenadores pueden llevar el seguimiento de muchos
                jugadores, guardar sus estadísticas de partidos y programar
                sesiones de entrenamiento.
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
            <Button
              onPress={() => handleUpdateRole(role)}
              disabled={!role}
              active
              title="Continuar"
              size="xl"
              type="white"
            />
          </View>
        </View>
      </ContainerWithBg>
    </>
  );
};
