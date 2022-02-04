import React from 'react';

import {View, Text, Image} from 'react-native';
import t from '../../Theme/theme';

import ExerciseIllustration from '../../Assets/SVG/exercises/01.svg';
import {Chip} from '../UI/Chip';

export const DailyExercise = () => {
  return (
    <View style={[t.mB5]}>
      <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>Ejercicio del día</Text>
      <View style={[t.flexRow, t.itemsCenter]}>
        <View style={[t.flex2, t.pR1]}>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <Text style={[t.fontSansBold, t.mR2]}>Nivel:</Text>
            <Chip text="Básico" mainColor="warning" />
          </View>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Objetivo:</Text> Control de golpe
            contra muro
          </Text>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Descripción:</Text> Ubicado el
            jugador sobre la línea de saque, realizará golpes cortos de derecha
            con un bote contra la parded de fondo
          </Text>
          <View style={[t.flexRow, t.itemsCenter]}>
            <Text style={[t.fontSansBold, t.mR2]}>Duración:</Text>
            <Chip text="1 minuto" />
          </View>
        </View>
        <View style={[t.flex1]}>
          <Image
            resizeMode="contain"
            source={{
              uri: 'https://res.cloudinary.com/enalbis/image/upload/v1643810017/PadelPro/exercises/01/01_kooqas_uilrjw.png',
            }}
            style={[t.h48]}
          />
        </View>
      </View>
    </View>
  );
};
