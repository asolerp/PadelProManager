import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {Avatar} from '../UI/Avatar';

export const FinishedMatchHeader = ({match}) => {
  const setStyle = [t.fontSansBold, t.text3xl, t.textInfoDark];
  const playerNameStyle = [t.fontSansMedium];
  const p1 = match?.t1?.[0];
  const p2 = match?.t1?.[1];
  const p3 = match?.t2?.[0];
  const p4 = match?.t2?.[1];

  return (
    <View style={[t.mT7]}>
      <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB4]}>
        <View style={[t.flex1]}>
          <Avatar img={p1?.profileImg} style={[]} />
          <Avatar img={p2?.profileImg} style={[t._mT7, t.mL12]} />
        </View>
        <View style={[t.flex1, t.itemsCenter]}>
          <Text style={playerNameStyle}>
            {shortName(1, p1?.firstName, p1?.secondName)}
          </Text>
          <Text style={playerNameStyle}>
            {shortName(2, p2?.firstName, p2?.secondName)}
          </Text>
        </View>
        <View style={[t.flexRow, t.flex1, t.justifyAround, t.mR8]}>
          <Text style={setStyle}>{match?.game?.s1t1}</Text>
          <Text style={setStyle}>{match?.game?.s2t1}</Text>
          <Text style={setStyle}>{match?.game?.s3t1}</Text>
        </View>
      </View>
      <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
        <View style={[t.flex1]}>
          <Avatar img={p3?.profileImg} style={[]} />
          <Avatar img={p4?.profileImg} style={[t._mT7, t.mL12]} />
        </View>
        <View style={[t.flex1, t.itemsCenter]}>
          <Text style={playerNameStyle}>
            {shortName(3, p3?.firstName, p3?.secondName)}
          </Text>
          <Text style={playerNameStyle}>
            {shortName(4, p4?.firstName, p4?.secondName)}
          </Text>
        </View>
        <View style={[t.flexRow, t.flex1, t.justifyAround, t.mR8]}>
          <Text style={setStyle}>{match?.game?.s1t2}</Text>
          <Text style={setStyle}>{match?.game?.s2t2}</Text>
          <Text style={setStyle}>{match?.game?.s3t2}</Text>
        </View>
      </View>
    </View>
  );
};