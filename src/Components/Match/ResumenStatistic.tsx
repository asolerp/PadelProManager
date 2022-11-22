import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import t from '../../Theme/theme';
import {Chip} from '../../Components/UI/Chip';
import {useResumeStatistics} from './hooks/useResumeStatistcis';

const CELL_SIZE = 30;

export const ResumenStatistic = ({statistics, withBlur = true}) => {
  console.log('TABLE STATS', statistics);

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
    x3W,
    x4W,
    vdEf,
    vrEf,
    fdEf,
    frEf,
    bdEf,
    brEf,
    bjEf,
    smEf,
    glEf,
    x3Ef,
    x4Ef,
    vdNf,
    vrNf,
    fdNf,
    frNf,
    bdNf,
    brNf,
    bjNf,
    smNf,
    glNf,
    x3Nf,
    x4Nf,
    totalW,
    totalEf,
    totalNf,
  } = useResumeStatistics({statistics});

  return (
    <View style={[t.mB3, t.wFull, !withBlur && t.bgWhite, t.p4, t.roundedSm]}>
      <ScrollView
        nestedScrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[t.flexRow]}>
        <View>
          <View style={[t.flexRow, t.mB3]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter, t.justifyCenter]}>
              <Text style={[t.fontSansBold, withBlur && t.textWhite]}>TP</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="FD" mainColor="info" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="FR" mainColor="info" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="VD" mainColor="warning" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="VR" mainColor="warning" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="BD" mainColor="error" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="BR" mainColor="error" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="BJ" mainColor="primary" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="SM" mainColor="secondary" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="GL" mainColor="success" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="x3" mainColor="secondaryLight" />
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Chip text="x4" mainColor="secondaryLight" />
            </View>
            <View style={[t.itemsCenter, t.justifyCenter, t.mL3]}>
              <Text style={[t.fontSansBold, withBlur && t.textWhite]}>
                Total
              </Text>
            </View>
          </View>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.textSuccess]}>W</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{fdW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{frW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{vdW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{vrW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{bdW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{brW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{bjW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{smW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{glW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{x3W}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccess]}>{x4W}</Text>
            </View>
            <View
              style={[
                {width: CELL_SIZE},
                t.itemsCenter,
                t.mL3,
                t.bgSuccess,
                t.p1,
                t.roundedSm,
              ]}>
              <Text style={[t.fontSansMedium, t.textWhite, t.textXs]}>
                {totalW}
              </Text>
            </View>
          </View>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.textInfo]}>FE</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{fdEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{frEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{vdEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{vrEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{bdEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{brEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{bjEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{smEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{glEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{x3Ef}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfo]}>{x4Ef}</Text>
            </View>
            <View
              style={[
                {width: CELL_SIZE},
                t.itemsCenter,
                t.mL3,
                t.bgInfo,
                t.p1,
                t.roundedSm,
              ]}>
              <Text style={[t.fontSansMedium, t.textWhite, t.textXs]}>
                {totalEf}
              </Text>
            </View>
          </View>
          <View style={[t.flexRow, t.itemsCenter]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.textError]}>NF</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{fdNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{frNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{vdNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{vrNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{bdNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{brNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{bjNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{smNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{glNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{x3Nf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textError]}>{x4Nf}</Text>
            </View>
            <View
              style={[
                {width: CELL_SIZE},
                t.itemsCenter,
                t.mL3,
                t.bgError,
                t.p1,
                t.roundedSm,
              ]}>
              <Text style={[t.fontSansMedium, t.textWhite, t.textXs]}>
                {totalNf}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
