import {format} from 'date-fns';
import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {shortName} from '../../Utils/parsers';
import {Result} from './Result';
import Icon from 'react-native-vector-icons/FontAwesome';
import {openScreenWithPush} from '../../Router/utils/actions';
import {MATCH_SCREEN_KEY} from '../../Screens/Match/Match';
import {Chip} from '../UI/Chip';
import {HDivider} from '../UI/HDivider';
import {es} from 'date-fns/locale';
import {capitalizeText} from '../../Utils/capitalizeText';
import PressableOpacity from '../UI/PressableOpacity';
import {useState} from 'react';
import {useEffect} from 'react';

interface Props {
  match: any;
  playerEmail: string;
}

export const MatchResume: React.FC<Props> = ({match, playerEmail}) => {
  const matchDay = format(new Date(match?.date?.toDate()), 'iii d MMMM yyyy', {
    locale: es,
  });

  const [playerWon, setPlayerWon] = useState(true);

  useEffect(() => {
    if (playerEmail) {
      const playerIsInWonTeam = match[`t${match.game.winMatch}`]?.some(
        p => p.email === playerEmail,
      );
      if (playerIsInWonTeam) {
        setPlayerWon(true);
      } else {
        setPlayerWon(false);
      }
    }
  }, [playerEmail]);

  return (
    <PressableOpacity
      onPress={() =>
        openScreenWithPush(MATCH_SCREEN_KEY, {
          matchId: match?.id,
          title: match?.round,
        })
      }
      style={[t.wFull, t.flexRow, t.justifyBetween, t.itemsCenter, t.mB2]}>
      <View style={[t.flexRow]}>
        <View style={[t.justifyCenter]}>
          <Result won={playerWon} result={match?.game} />
        </View>
        <View>
          <View style={[t.justifyEnd, t.mT1]}>
            <Text ellipsizeMode="tail" style={[t.fontSansMedium, t.textSm]}>
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
            <View style={[t.itemsStart, t.justifyStart]}>
              <Text style={[t.opacity30, t.fontSansMedium, t.textXs, t.mR4]}>
                {capitalizeText(matchDay)}
              </Text>
              <Text style={[t.opacity30, t.fontSansMedium, t.textXs]}>
                {match?.club}
              </Text>
            </View>
          </View>
        </View>
        <View />
      </View>
      <View style={[t.flexGrow, t.flexRow, t.itemsCenter, t.justifyEnd]}>
        {match?.state === 'live' && (
          <View style={[t.itemsStart, t.mY1]}>
            <Chip mainColor="error" text="Live" />
          </View>
        )}
        {match?.state === 'finished' && (
          <View style={[t.itemsStart, t.mY1]}>
            <Chip mainColor="primary" text="Finalizado" />
          </View>
        )}
        <Icon name="chevron-right" size={15} color="black" style={[t.mL3]} />
      </View>
    </PressableOpacity>
  );
};
