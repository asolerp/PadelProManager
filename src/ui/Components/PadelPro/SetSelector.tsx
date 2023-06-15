import React, {useState} from 'react';
import {Text, View} from 'react-native';
import t from '../../Theme/theme';
import PressableOpacity from '../UI/PressableOpacity';

export const SetSelector = ({activeSet, handleActiveSet}) => {
  const stylesActive = [t.opacity100, t.bgGray200];

  return (
    <View style={[t.flexRow]}>
      <PressableOpacity
        onPress={() => handleActiveSet('total')}
        style={[
          t.flex1,
          {borderWidth: 1},
          t.borderGray200,
          t.roundedTlSm,
          t.roundedBlSm,
          t.justifyCenter,
          t.itemsCenter,
          t.opacity30,
          t.h12,
          activeSet === 'total' && [...stylesActive],
        ]}>
        <Text
          style={[
            t.textWhite,
            t.fontSansMedium,
            t.opacity30,
            activeSet === 'total' && [t.textGray900, t.opacity100],
          ]}>
          Global
        </Text>
      </PressableOpacity>
      <PressableOpacity
        onPress={() => handleActiveSet('s1')}
        style={[
          t.flex1,
          {borderWidth: 1},
          t.borderGray200,
          t.justifyCenter,
          t.itemsCenter,
          t.h12,
          activeSet === 's1' && [...stylesActive],
        ]}>
        <Text
          style={[
            t.textWhite,
            t.fontSansMedium,
            t.opacity30,
            activeSet === 's1' && [t.textGray900, t.opacity100],
          ]}>
          Set 1
        </Text>
      </PressableOpacity>
      <PressableOpacity
        onPress={() => handleActiveSet('s2')}
        style={[
          t.flex1,
          {borderWidth: 1},
          t.borderGray200,
          t.justifyCenter,
          t.itemsCenter,
          t.opacity30,
          t.h12,
          activeSet === 's2' && [...stylesActive],
        ]}>
        <Text
          style={[
            t.textWhite,
            t.fontSansMedium,
            t.opacity30,
            activeSet === 's2' && [t.textGray900, t.opacity100],
          ]}>
          Set 2
        </Text>
      </PressableOpacity>
      <PressableOpacity
        onPress={() => handleActiveSet('s3')}
        style={[
          t.flex1,
          {borderWidth: 1},
          t.borderGray200,
          t.justifyCenter,
          t.itemsCenter,
          t.roundedTrSm,
          t.roundedBrSm,
          t.opacity30,
          t.h12,
          activeSet === 's3' && [...stylesActive],
        ]}>
        <Text
          style={[
            t.textWhite,
            t.fontSansMedium,
            t.opacity30,
            activeSet === 's3' && [t.textGray900, t.opacity100],
          ]}>
          Set 3
        </Text>
      </PressableOpacity>
    </View>
  );
};
