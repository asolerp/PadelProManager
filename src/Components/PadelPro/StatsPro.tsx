import React from 'react';
import {Text, View} from 'react-native';
import t from '../../Theme/theme';

const DARK_BLUE = '#21336B';
const DARK_GOLD = '#CA9944';

export const StatsPro = () => {
  return (
    <View>
      <View style={[t.flexRow]}>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>35</Text>
        </View>
        <View
          style={[
            t.flex4,
            t.bgWhite,
            t.h10,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_BLUE},
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>
            TOTAL PUNTOS GANADOS
          </Text>
        </View>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>47</Text>
        </View>
      </View>
      <View style={[t.flexRow]}>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>35</Text>
        </View>
        <View
          style={[
            t.flex4,
            t.bgWhite,
            t.h10,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_BLUE},
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>% PUNTOS GANADOS</Text>
        </View>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>47</Text>
        </View>
      </View>
      <View style={[t.flexRow]}>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>35</Text>
        </View>
        <View
          style={[
            t.flex4,
            t.bgWhite,
            t.h10,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_BLUE},
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>BREAK POINTS</Text>
        </View>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>47</Text>
        </View>
      </View>
      <View style={[t.flexRow]}>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_GOLD},
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>35</Text>
        </View>
        <View
          style={[
            t.flex4,
            t.bgWhite,
            t.h10,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_BLUE},
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>
            PUNTOS DE ORO GANADOS
          </Text>
        </View>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_GOLD},
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>47</Text>
        </View>
      </View>
      <View style={[t.flexRow]}>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_GOLD},
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>35</Text>
        </View>
        <View
          style={[
            t.flex4,
            t.bgWhite,
            t.h10,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_BLUE},
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>GANADOS AL SERVICIO</Text>
        </View>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_GOLD},
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>47</Text>
        </View>
      </View>
      <View style={[t.flexRow]}>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_GOLD},
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>35</Text>
        </View>
        <View
          style={[
            t.flex4,
            t.bgWhite,
            t.h10,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_BLUE},
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>GANADOS AL RESTO</Text>
        </View>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_GOLD},
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>47</Text>
        </View>
      </View>
      <View style={[t.flexRow]}>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>35</Text>
        </View>
        <View
          style={[
            t.flex4,
            t.bgWhite,
            t.h10,
            t.itemsCenter,
            t.justifyCenter,
            {backgroundColor: DARK_BLUE},
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>
            GANADOS CONSECUTIDOS
          </Text>
        </View>
        <View
          style={[
            t.h10,
            t.flex1,
            t.bgWhite,
            t.bgInfoLight,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, {color: DARK_BLUE}]}>47</Text>
        </View>
      </View>
    </View>
  );
};
