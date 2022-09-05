import React from 'react';
import {Text, View} from 'react-native';
import t from '../../Theme/theme';

export const ResultPro = () => {
  return (
    <>
      <View style={[t.flexRow]}>
        <View style={[t.flex4]}>
          <Text style={[t.fontSans, t.textWhite]}>SEMIFINAL</Text>
        </View>
        <View style={[t.flex1]}>
          <Text style={[t.fontSans, t.textWhite]}>SET1</Text>
        </View>
        <View style={[t.flex1]}>
          <Text style={[t.fontSans, t.textWhite]}>SET2</Text>
        </View>
        <View style={[t.flex1]}>
          <Text style={[t.fontSans, t.textWhite]}>SET3</Text>
        </View>
        <View style={[t.flex1]}>
          <Text style={[t.fontSans, t.textWhite]}>GAME</Text>
        </View>
      </View>
      <View
        style={[t.flexRow, t.borderT0_5, t.borderB0_5, t.borderWhite, t.mT1]}>
        <View style={[t.flex4, t.pY1]}>
          <Text style={[t.fontSansBold, t.textWhite]}>JUAN LEBRÓN</Text>
          <Text style={[t.fontSansBold, t.textWhite]}>ÁLVARO GALÁN</Text>
        </View>
        <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>6</Text>
        </View>
        <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>5</Text>
        </View>
        <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>6</Text>
        </View>
        <View style={[t.flex1, t.bgInfoLight, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>0</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.borderB0_5, t.borderWhite]}>
        <View style={[t.flex4, t.pY1]}>
          <Text style={[t.fontSansBold, t.textWhite]}>PAQUITO NAVARRO</Text>
          <Text style={[t.fontSansBold, t.textWhite]}>MARTÍN DINENO</Text>
        </View>
        <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>3</Text>
        </View>
        <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>7</Text>
        </View>
        <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>4</Text>
        </View>
        <View style={[t.flex1, t.bgInfoLight, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>0</Text>
        </View>
      </View>
    </>
  );
};
