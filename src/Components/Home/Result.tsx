import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';

interface Props {
  won: boolean;
  result: {
    s1t1: number;
    s2t1: number;
    s3t1: number;
    s1t2: number;
    s2t2: number;
    s3t2: number;
  };
}

export const Result = ({won, result}) => {
  const colorResultWrapper = won ? t.borderSuccessLight : t.borderErrorLight;
  const colorResultText = won ? t.textSuccessLight : t.textErrorLight;
  const textColor = [t.fontSansMedium, t.textLg, colorResultText];

  return (
    <View
      style={[
        t.justifyCenter,
        colorResultWrapper,
        t.border,
        t.roundedSm,
        t.mR3,
        t.pY1,
        t.h14,
      ]}>
      <View style={[t.flexRow, t.justifyAround, t.itemsCenter, t.w14]}>
        <Text style={textColor}>{result.s1t1}</Text>
        <Text style={textColor}>{result.s2t1}</Text>
        <Text style={textColor}>{result.s3t1}</Text>
      </View>
      <View style={[t.flexRow, t.justifyAround, t.itemsCenter]}>
        <Text style={textColor}>{result.s1t2}</Text>
        <Text style={textColor}>{result.s2t2}</Text>
        <Text style={textColor}>{result.s3t2}</Text>
      </View>
    </View>
  );
};
