import {format} from 'date-fns';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {Result} from './Result';
import Icon from 'react-native-vector-icons/FontAwesome';
import {openScreenWithPush} from '../../Router/utils/actions';
import {MATCH_SCREEN_KEY} from '../../Screens/Match/Match';
import {Chip} from '../UI/Chip';
import {HDivider} from '../UI/HDivider';

interface Props {
  match: any;
}

export const MatchResume: React.FC<Props> = ({match}) => {
  const matchDay = format(new Date(match?.date?.toDate()), 'iii d MMMM yyyy');

  return (
    <View style={[t.mB2]}>
      <Pressable
        onPress={() =>
          openScreenWithPush(MATCH_SCREEN_KEY, {
            matchId: match?.id,
            title: match?.round,
          })
        }
        style={[t.wFull, t.flexRow, t.justifyCenter, t.itemsCenter, t.mB2]}>
        <View style={[t.justifyCenter]}>
          <Result won result={match.game} />
        </View>
        <View>
          <View style={[t.justifyEnd, t.mT1]}>
            <Text style={[t.fontSansMedium, t.textSm]}>
              {shortName(
                1,
                match?.t1?.[0]?.firstName,
                match?.t1?.[0]?.secondName,
              )}
              {' / '}
              {shortName(
                2,
                match?.t1?.[1]?.firstName,
                match?.t1?.[1]?.secondName,
              )}{' '}
            </Text>
          </View>
          <View style={[t.justifyEnd, t.mB1, t.mT1]}>
            <Text style={[t.fontSansMedium, t.textSm]}>
              {shortName(
                3,
                match?.t2?.[0]?.firstName,
                match?.t2?.[0]?.secondName,
              )}
              {' / '}
              {shortName(
                4,
                match?.t2?.[1]?.firstName,
                match?.t2?.[1]?.secondName,
              )}
            </Text>
          </View>
          <View>
            <View style={[t.flexRow, t.itemsStart, t.justifyStart]}>
              <Text style={[t.opacity30, t.fontSansMedium, t.textXs, t.mR4]}>
                {matchDay}
              </Text>
              <Text style={[t.opacity30, t.fontSansMedium, t.textXs]}>
                {match.club}
              </Text>
            </View>
          </View>
        </View>
        <View />
        <View style={[t.flexGrow, t.flexRow, t.itemsCenter, t.justifyEnd]}>
          {match?.state === 'live' && (
            <View style={[t.itemsStart, t.mY1]}>
              <Chip mainColor="error" text="Live" />
            </View>
          )}
          <Icon name="chevron-right" size={15} color="black" style={[t.mL3]} />
        </View>
      </Pressable>
      <HDivider />
    </View>
  );
};
