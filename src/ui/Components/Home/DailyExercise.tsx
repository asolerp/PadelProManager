import React from 'react';

import {View, Text, Image} from 'react-native';
import t from '../../Theme/theme';

import {Chip} from '../UI/Chip';

export const DailyExercise = ({exercise}) => {
  return (
    <View style={[t.mB5]}>
      <View style={[t.flexRow, t.itemsCenter]}>
        <View style={[t.flex2, t.pR1]}>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <Text style={[t.fontSansBold, t.mR2]}>Nivel:</Text>
            <Chip text={exercise?.level} mainColor="warning" />
          </View>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Objetivo:</Text>{' '}
            {exercise?.objective}
          </Text>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Descripción:</Text>{' '}
            {exercise?.description}
          </Text>
          <View style={[t.flexRow, t.itemsCenter]}>
            <Text style={[t.fontSansBold, t.mR2]}>Duración:</Text>
            <Chip
              text={`${exercise?.duration} minuto${
                exercise?.duration > 1 ? 's' : ''
              }`}
            />
          </View>
        </View>
        <View style={[t.flex1]}>
          <Image
            resizeMode="contain"
            source={{
              uri: exercise?.image?.url,
            }}
            style={[t.h48]}
          />
        </View>
      </View>
    </View>
  );
};
