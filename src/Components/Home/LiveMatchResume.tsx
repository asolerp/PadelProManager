import React from 'react';
import {View, Text, Pressable} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';
import {shortName} from '../../Utils/parsers';
import {openScreenWithPush} from '../../Router/utils/actions';
import {MATCH_SCREEN_KEY} from '../../Screens/Match/Match';
import {resultGame} from '../../Utils/gameLogic';

const cardLabel = [t.textXs, t.fontSansBold, t.textWhite, t.opacity70];
const cardInfo = [t.textXs, t.fontSansBold, t.textWhite];
const setNumber = [t.textBase, t.fontSansBold, t.textWhite, t.opacity70];

interface Props {
  match: any;
}

export const LiveMatchResume: React.FC<Props> = ({match}) => {
  const matchDay = format(new Date(match.date.toDate()), 'iii d MMMM yyyy');

  return (
    <Pressable
      style={[t.w64, t.h36, t.bgInfo, t.roundedLg, t.p3, t.shadow]}
      onPress={() => openScreenWithPush(MATCH_SCREEN_KEY, {matchId: match.id})}>
      <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.mB3]}>
        <View>
          <Text style={[cardLabel]}>Fecha</Text>
          <Text style={[cardInfo]}>{matchDay}</Text>
        </View>
        <View>
          <Text style={[cardLabel]}>Club</Text>
          <Text style={[cardInfo]}>Palma Raquet</Text>
        </View>
      </View>
      <View style={[t.wFull, t.borderB, t.borderWhite]} />
      <View style={[t.flexGrow, t.flexRow, t.mR4]}>
        <View style={[t.flex2, t.justifyCenter]}>
          <Text style={[cardInfo]}>
            {shortName(match.t1[0].firstName, match.t1[0].secondName)}
          </Text>
          <Text style={[cardInfo]}>
            {shortName(match.t1[1].firstName, match.t1[1].secondName)}
          </Text>
        </View>
        <View style={[t.flex1, t.justifyCenter]}>
          {match.game.service === 't1' && (
            <Icon name="tennisball" size={15} color="white" />
          )}
        </View>
        <View style={[t.flex3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <Text style={[t.textSm, t.fontSansBold, t.textWhite, t.w10]}>
            {resultGame(match?.game).split('-')[0]}
          </Text>
          <Text style={[setNumber]}>{match.game.s1t1}</Text>
          <Text style={[setNumber]}>{match.game.s2t1}</Text>
          <Text style={[setNumber]}>{match.game.s3t1}</Text>
        </View>
      </View>
      <View style={[t.wFull, t.borderB, t.borderWhite]} />
      <View style={[t.flexGrow, t.flexRow, t.mR4]}>
        <View style={[t.flex2, t.justifyCenter]}>
          <Text style={[cardInfo]}>
            {shortName(match.t2[0].firstName, match.t2[0].secondName)}
          </Text>
          <Text style={[cardInfo]}>
            {shortName(match.t2[1].firstName, match.t2[1].secondName)}
          </Text>
        </View>
        <View style={[t.flex1, t.justifyCenter]}>
          {match.game.service === 't2' && (
            <Icon name="tennisball" size={15} color="white" />
          )}
        </View>
        <View style={[t.flex3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
          <Text style={[t.textSm, t.fontSansBold, t.textWhite, t.w10]}>
            {resultGame(match?.game).split('-')[1]}
          </Text>
          <Text style={[setNumber]}>{match.game.s1t2}</Text>
          <Text style={[setNumber]}>{match.game.s2t2}</Text>
          <Text style={[setNumber]}>{match.game.s3t2}</Text>
        </View>
      </View>
    </Pressable>
  );
};
