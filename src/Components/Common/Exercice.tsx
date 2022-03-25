import React from 'react';

import {View, Text, Image} from 'react-native';
import t from '../../Theme/theme';

import {Chip} from '../UI/Chip';

export const Exercice = ({level, objective, description, duration, image}) => {
  return (
    <View>
      <View style={[t.flexRow, t.itemsCenter]}>
        <View style={[t.flex2, t.pR2]}>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <Text style={[t.fontSansBold, t.mR2]}>Nivel:</Text>
            <Chip text={level} mainColor="warning" />
          </View>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Objetivo:</Text> {objective}
          </Text>
          <Text style={[t.fontSans, t.mB2]}>
            <Text style={[t.fontSansBold]}>Descripción:</Text> {description}
          </Text>
          {duration && (
            <View style={[t.flexRow, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.mR2]}>Duración:</Text>
              <Chip text={`${duration} minuto${duration > 1 ? 's' : ''}`} />
            </View>
          )}
        </View>
        <View style={[t.flex1]}>
          <Image
            resizeMode="contain"
            source={{
              uri: image,
            }}
            style={[t.h48]}
          />
        </View>
      </View>
    </View>
  );
};
