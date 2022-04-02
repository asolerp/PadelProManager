import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';
import {shortName} from '../../Utils/parsers';
import {openScreenWithPush} from '../../Router/utils/actions';
import {MATCH_SCREEN_KEY} from '../../Screens/Match/Match';

import {DATE_MATCH} from '../../Utils/date-ext';
import {es} from 'date-fns/locale';
import {capitalizeText} from '../../Utils/capitalizeText';
import PressableOpacity from '../UI/PressableOpacity';
import {resultGame} from '../../Utils/resultGame';

const cardLabel = [t.textBase, t.fontSansBold, t.textWhite, t.opacity70];
const cardInfo = [t.textBase, t.fontSansBold, t.textWhite];
const setNumber = [t.textLg, t.fontSansBold, t.textWhite, t.opacity70];

interface Props {
  match: any;
}

export const LiveMatchResume: React.FC<Props> = ({match}) => {
  const matchDay = format(new Date(match?.date.toDate()), DATE_MATCH, {
    locale: es,
  });

  return (
    <PressableOpacity
      style={[t.w80, t.h44, t.bgInfo, t.roundedLg, t.p3, t.shadow, t.mR3]}
      onPress={() =>
        openScreenWithPush(MATCH_SCREEN_KEY, {
          matchId: match?.id,
          title: match?.round,
        })
      }>
      <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.mB3]}>
        <View>
          <Text style={[cardLabel]}>Fecha</Text>
          <Text style={[cardInfo]}>{capitalizeText(matchDay)}</Text>
        </View>
        <View>
          <Text style={[cardLabel]}>Club</Text>
          <Text style={[cardInfo]}>{match?.club}</Text>
        </View>
      </View>
      <View style={[t.wFull, t.borderB, t.borderWhite]} />
      <View style={[t.flexGrow, t.flexRow, t.mR4]}>
        <View style={[t.flex2, t.justifyCenter]}>
          <Text ellipsizeMode="tail" style={[t.flex1, cardInfo]}>
            {shortName(
              1,
              match?.t1?.[0]?.firstName,
              match?.t1?.[0]?.secondName,
            )}
          </Text>
          <Text ellipsizeMode="tail" style={[t.flex1, cardInfo]}>
            {shortName(
              2,
              match?.t1?.[1]?.firstName,
              match?.t1?.[1]?.secondName,
            )}
          </Text>
        </View>
        <View style={[t.flex1, t.justifyCenter]}>
          {match?.game.service === 't1' && (
            <Icon name="tennisball" size={15} color="white" />
          )}
        </View>
        <View style={[t.flex3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <Text style={[t.textBase, t.fontSansBold, t.textWhite, t.w10]}>
            {match?.game && resultGame(match?.game).split('-')[0]}
          </Text>
          <Text style={[setNumber]}>{match?.game.s1t1}</Text>
          <Text style={[setNumber]}>{match?.game.s2t1}</Text>
          <Text style={[setNumber]}>{match?.game.s3t1}</Text>
        </View>
      </View>
      <View style={[t.wFull, t.borderB, t.borderWhite]} />
      <View style={[t.flexGrow, t.flexRow, t.mR4]}>
        <View style={[t.flex2, t.justifyCenter]}>
          <Text ellipsizeMode="tail" style={[t.flex1, cardInfo]}>
            {shortName(
              3,
              match?.t2?.[0]?.firstName,
              match?.t2?.[0]?.secondName,
            )}
          </Text>
          <Text ellipsizeMode="tail" style={[t.flex1, cardInfo]}>
            {shortName(
              4,
              match?.t2?.[1]?.firstName,
              match?.t2?.[1]?.secondName,
            )}
          </Text>
        </View>
        <View style={[t.flex1, t.justifyCenter]}>
          {match?.game.service === 't2' && (
            <Icon name="tennisball" size={15} color="white" />
          )}
        </View>
        <View style={[t.flex3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <Text style={[t.textBase, t.fontSansBold, t.textWhite, t.w10]}>
            {resultGame(match?.game).split('-')[1]}
          </Text>
          <Text style={[setNumber]}>{match?.game.s1t2}</Text>
          <Text style={[setNumber]}>{match?.game.s2t2}</Text>
          <Text style={[setNumber]}>{match?.game.s3t2}</Text>
        </View>
      </View>
    </PressableOpacity>
  );
};
