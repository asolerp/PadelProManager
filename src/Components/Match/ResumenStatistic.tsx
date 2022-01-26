import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {Chip} from '../../Components/UI/Chip';
import {useResumeStatistics} from './hooks/useResumeStatistcis';

const CELL_SIZE = 30;

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
    vdEf,
    vrEf,
    fdEf,
    frEf,
    bdEf,
    brEf,
    bjEf,
    smEf,
    vdNf,
    vrNf,
    fdNf,
    frNf,
    bdNf,
    brNf,
    bjNf,
    smNf,
    totalW,
    totalEf,
    totalNf,
  } = useResumeStatistics({statistics});

  return (
    <View style={[t.mB3, t.wFull]}>
      <View style={[t.flexRow, t.wFull]}>
        <View>
          <View style={[t.flexRow, t.mB3]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter, t.justifyCenter]}>
              <Text style={[t.fontSansBold]}>TP</Text>
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
            <View style={[t.itemsCenter, t.justifyCenter, t.mL3]}>
              <Text style={[t.fontSansBold]}>Total</Text>
            </View>
          </View>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.textSuccessDark]}>W</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{vdW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{fdW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{frW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{vrW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{bdW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{brW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{bjW}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textSuccessDark]}>{smW}</Text>
            </View>
            <View
              style={[
                {width: CELL_SIZE},
                t.itemsCenter,
                t.mL3,
                t.bgSuccessDark,
                t.p1,
                t.roundedFull,
              ]}>
              <Text style={[t.fontSansMedium, t.textWhite, t.textXs]}>
                {totalW}
              </Text>
            </View>
          </View>
          <View style={[t.flexRow, t.itemsCenter, t.mB2]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.textInfoDark]}>FE</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{fdEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{frEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{vdEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{vrEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{bdEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{brEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{bjEf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textInfoDark]}>{smEf}</Text>
            </View>
            <View
              style={[
                {width: CELL_SIZE},
                t.itemsCenter,
                t.mL3,
                t.bgInfoDark,
                t.p1,
                t.roundedFull,
              ]}>
              <Text style={[t.fontSansMedium, t.textWhite, t.textXs]}>
                {totalEf}
              </Text>
            </View>
          </View>
          <View style={[t.flexRow, t.itemsCenter]}>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansBold, t.textErrorDark]}>NF</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{fdNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{frNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{vdNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{vrNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{bdNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{brNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{bjNf}</Text>
            </View>
            <View style={[{width: CELL_SIZE}, t.itemsCenter]}>
              <Text style={[t.fontSansMedium, t.textErrorDark]}>{smNf}</Text>
            </View>
            <View
              style={[
                {width: CELL_SIZE},
                t.itemsCenter,
                t.mL3,
                t.bgErrorDark,
                t.p1,
                t.roundedFull,
              ]}>
              <Text style={[t.fontSansMedium, t.textWhite, t.textXs]}>
                {totalNf}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
