import React from 'react';
import {View} from 'react-native';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {useGetMatch} from './hooks/useGetMatch';
import {roundParser} from '../../Utils/parsers';
import t from '../../Theme/theme';

import PadelField from '../../Assets/SVG/padelField.svg';
import {HDivider} from '../../Components/UI/HDivider';
import {MatchHeader} from '../../Components/Match/MatchHeader';
import {MatchInfo} from '../../Components/Match/MatchInfo';

import {ScrollView} from 'react-native-gesture-handler';
import {MatchTabs} from '../../Components/Match/MatchTabs';

export const MATCH_SCREEN_KEY = 'matchScreen';

export const MatchScreen: React.FC = ({route}) => {
  const {matchId} = route.params;
  const {match} = useGetMatch(matchId);

  return (
    <ScreenLayout withBack title={roundParser[match?.round]}>
      <ScrollView contentContainerStyle={[t.flex1]}>
        <MatchHeader match={match} />
        <View style={[t.mY5]}>
          <PadelField />
        </View>
        <HDivider />
        <MatchInfo
          club={match.club}
          date={match.date}
          category={match.category}
        />
        <HDivider />
        <View style={[t.flexGrow, t.mT5]}>
          <MatchTabs />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
