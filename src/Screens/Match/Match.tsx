import React, {useState} from 'react';
import {View, Text} from 'react-native';
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
import {AddButton} from '../../Components/UI/AddButton';
import {BottomModal} from '../../Components/Modal/BottomModal';

import {NewPointModal} from '../../Components/Match/NewPointModal';
import {useLiveMatch} from '../../Components/Match/hooks/useLiveMatch';

export const MATCH_SCREEN_KEY = 'matchScreen';

export const MatchScreen: React.FC = ({route}) => {
  const {matchId} = route.params;
  const {match, loadingMatch, history} = useGetMatch(matchId);
  const {handleSavePoint} = useLiveMatch(match);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ScreenLayout withBack title={roundParser[match?.round]}>
      <AddButton
        iconName="tennisball"
        style={[t.bgSuccessLight]}
        onPress={() => setIsModalVisible(true)}
      />
      <BottomModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <NewPointModal
          match={match}
          onSavePoint={point => {
            setIsModalVisible(false);
            handleSavePoint(point);
          }}
        />
      </BottomModal>
      <ScrollView contentContainerStyle={[t.flex1]}>
        {!loadingMatch && (
          <>
            <MatchHeader match={match} />
            <View style={[t.mY5]}>
              <PadelField />
            </View>
            <HDivider />
            <MatchInfo
              club={match?.club}
              date={match?.date.toDate()}
              category={match?.category}
            />
            <HDivider />
            <View style={[t.flexGrow, t.mT5]}>
              <MatchTabs match={match} pointsHistory={history} />
            </View>
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};
