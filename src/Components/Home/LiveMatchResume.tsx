import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const cardLabel = [t.textXs, t.fontSansBold, t.textWhite, t.opacity70];
const cardInfo = [t.textXs, t.fontSansBold, t.textWhite];
const setNumber = [t.textBase, t.fontSansBold, t.textWhite, t.opacity70];

export const LiveMatchResume = () => {
  return (
    <View style={[t.w64, t.h36, t.bgInfo, t.roundedLg, t.p3, t.shadowMd]}>
      <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.mB3]}>
        <View>
          <Text style={[cardLabel]}>Fecha</Text>
          <Text style={[cardInfo]}>Lun 21 Enero 2022</Text>
        </View>
        <View>
          <Text style={[cardLabel]}>Club</Text>
          <Text style={[cardInfo]}>Palma Raquet</Text>
        </View>
      </View>
      <View style={[t.wFull, t.borderB, t.borderWhite]} />
      <View style={[t.flexGrow, t.flexRow, t.mR4]}>
        <View style={[t.flex2, t.justifyCenter]}>
          <Text style={[cardInfo]}>A.Soler</Text>
          <Text style={[cardInfo]}>A.Horrac</Text>
        </View>
        <View style={[t.flex1, t.justifyCenter]}>
          <Icon name="tennisball" size={15} color="white" />
        </View>
        <View style={[t.flex3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <Text style={[t.textSm, t.fontSansBold, t.textWhite]}>30</Text>
          <Text style={[setNumber]}>6</Text>
          <Text style={[setNumber]}>5</Text>
          <Text style={[setNumber]}>0</Text>
        </View>
      </View>
      <View style={[t.wFull, t.borderB, t.borderWhite]} />
      <View style={[t.flexGrow, t.flexRow, t.mR4]}>
        <View style={[t.flex2, t.justifyCenter]}>
          <Text style={[cardInfo]}>J.Marti</Text>
          <Text style={[cardInfo]}>M.Gual</Text>
        </View>
        <View style={[t.flex1]} />
        <View style={[t.flex3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <Text style={[t.textSm, t.fontSansBold, t.textWhite]}>15</Text>
          <Text style={[setNumber]}>1</Text>
          <Text style={[setNumber]}>5</Text>
          <Text style={[setNumber]}>0</Text>
        </View>
      </View>
    </View>
  );
};
