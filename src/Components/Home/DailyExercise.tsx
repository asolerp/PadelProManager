import React from 'react';

import {View, Text, Image} from 'react-native';
import t from '../../Theme/theme';

import {Chip} from '../UI/Chip';
import {useGetDailyExercise} from './hooks/useGetDailyExercise';

export const DailyExercise = () => {
  const {dailyExercise} = useGetDailyExercise();

  return (
    <View style={[t.mB5]}>
      <Text style={[t.text2xl, t.fontSansBold, t.mB5]}>Ejercicio del día</Text>
      <View style={[t.flexRow, t.itemsCenter]}>
        <View style={[t.flex2, t.pR1]}>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <Text style={[t.fontSansBold, t.mR2]}>Nivel:</Text>
            <Chip text={dailyExercise?.level} mainColor="warning" />
          </View>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Objetivo:</Text>{' '}
            {dailyExercise?.objective}
          </Text>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Descripción:</Text>{' '}
            {dailyExercise?.description}
          </Text>
          <View style={[t.flexRow, t.itemsCenter]}>
            <Text style={[t.fontSansBold, t.mR2]}>Duración:</Text>
            <Chip
              text={`${dailyExercise?.duration} minuto${
                dailyExercise?.duration > 1 ? 's' : ''
              }`}
            />
          </View>
        </View>
        <View style={[t.flex1]}>
          <Image
            resizeMode="contain"
            source={{
              uri: dailyExercise?.image?.url,
            }}
            style={[t.h48]}
          />
        </View>
      </View>
    </View>
  );
};
