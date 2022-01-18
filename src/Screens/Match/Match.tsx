import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ScreenLayout, Header} from '../../Components/Layout';
import {useGetMatch} from './hooks/useGetMatch';
import {roundParser} from '../../Utils/parsers';
import t from '../../Theme/theme';

import {HDivider} from '../../Components/UI/HDivider';
import {MatchHeader} from '../../Components/Match/MatchHeader';
import {MatchInfo} from '../../Components/Match/MatchInfo';

import {MatchTabs} from '../../Components/Match/MatchTabs';
import {AddButton} from '../../Components/UI/AddButton';
import {BottomModal} from '../../Components/Modal/BottomModal';

import {NewPointModal} from '../../Components/Match/NewPointModal';
import {useLiveMatch} from '../../Components/Match/hooks/useLiveMatch';
import {NormalModal} from '../../Components/Modal/NormalModal';
import {Button} from '../../Components/UI/Button';

export const MATCH_SCREEN_KEY = 'matchScreen';

export const MatchScreen: React.FC = ({route}) => {
  const {matchId, title} = route.params;
  const {notes, match, loadingMatch, isStartTeamAssigned, history} =
    useGetMatch(matchId);
  const {handleSavePoint, handleWhoStarts, loading} = useLiveMatch(match);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ScreenLayout>
      <Header withBack title={roundParser[title]} />
      <AddButton
        iconName="tennisball"
        style={[t.bgSuccessLight]}
        onPress={() => setIsModalVisible(true)}
      />
      <NormalModal isVisible={isStartTeamAssigned} onClose={() => {}}>
        <Text style={[t.fontSansBold, t.textLg]}>
          ¿Que pareja empieza sacando?
        </Text>
        <View style={[t.flexRow, t.mT3, t.justifyBetween]}>
          <Button
            title="Pareja 1"
            style={[t.mR3]}
            onPress={() => handleWhoStarts('t1')}
          />
          <Button
            title="Pareja 2"
            type="success"
            onPress={() => handleWhoStarts('t2')}
          />
        </View>
      </NormalModal>
      <BottomModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <NewPointModal
          match={match}
          loading={loading}
          onSavePoint={point => {
            handleSavePoint(point, () => setIsModalVisible(false));
          }}
        />
      </BottomModal>
      <View style={[t.flex1]}>
        {!loadingMatch && (
          <>
            <View style={[t.mB5]}>
              <MatchHeader match={match} />
            </View>
            <HDivider />
            <MatchInfo
              club={match?.club}
              date={match?.date.toDate()}
              category={match?.category}
            />
            <HDivider />
            <View style={[t.flexGrow, t.mT5]}>
              <MatchTabs match={match} pointsHistory={history} notes={notes} />
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};
