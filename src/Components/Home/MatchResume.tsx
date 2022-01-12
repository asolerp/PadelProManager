import {format} from 'date-fns';
import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {Result} from './Result';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  match: any;
}

export const MatchResume: React.FC<Props> = ({match}) => {
  const matchDay = format(match.date, 'iii d MMMM yyyy');

  return (
    <>
      <View style={[t.wFull, t.flexRow, t.h16, t.justifyCenter, t.itemsCenter]}>
        <View style={[t.hFull, t.justifyCenter]}>
          <Result won result={match.game} />
        </View>
        <View>
          <View style={[t.flex1, t.justifyEnd, t.mB1]}>
            <Text style={[t.fontSansMedium, t.textSm]}>
              {shortName(match.t1[0].firstName, match.t1[0].secondName)}{' '}
              {shortName(match.t1[1].firstName, match.t1[1].secondName)} vs{' '}
              {shortName(match.t2[0].firstName, match.t2[0].secondName)}{' '}
              {shortName(match.t2[1].firstName, match.t2[1].secondName)}
            </Text>
          </View>
          <View style={[t.flex1, t.flexRow, t.itemsStart, t.justifyStart]}>
            <Text style={[t.opacity30, t.fontSansMedium, t.textXs, t.mR4]}>
              {matchDay}
            </Text>
            <Text style={[t.opacity30, t.fontSansMedium, t.textXs]}>
              {match.club}
            </Text>
          </View>
        </View>
        <View style={[t.flexGrow, t.itemsEnd, t.justifyCenter]}>
          <Icon name="chevron-right" size={15} color="black" />
        </View>
      </View>
      <View style={[t.borderB, t.h1, t.wFull, t.opacity20]} />
    </>
  );
};
