import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {Chip} from '../../Components/UI/Chip';
import {useResumeStatistics} from './hooks/useResumeStatistcis';

const CELL_SIZE = 60;

export const ResumenStatistic = ({statistics}) => {
  const {
    vdW,
    vrW,
    fdW,
    frW,
    bdW,
    brW,
    bjW,
    smW,
    glW,
    vdEf,
    vrEf,
    fdEf,
    frEf,
    bdEf,
    brEf,
    bjEf,
    smEf,
    glEf,
    vdNf,
    vrNf,
    fdNf,
    frNf,
    bdNf,
    brNf,
    bjNf,
    smNf,
    glNf,
    totalW,
    totalEf,
    totalNf,
  } = useResumeStatistics({statistics});

  return (
    <View style={[t.mB3]}>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgGray200,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold]}>TP</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgSuccess,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>W</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>EF</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgError,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>NF</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween]}>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.bgInfo,
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansBold, t.textWhite]}>FD</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textSuccess, t.textXl]}>{fdW}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textInfo, t.textXl]}>{fdEf}</Text>
        </View>
        <View
          style={[
            {width: CELL_SIZE, height: CELL_SIZE},
            t.itemsCenter,
            t.justifyCenter,
          ]}>
          <Text style={[t.fontSansMedium, t.textError, t.textXl]}>{fdNf}</Text>
        </View>
      </View>
    </View>
  );
};
