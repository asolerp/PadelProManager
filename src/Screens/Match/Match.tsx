import React, {useState} from 'react';
import {View} from 'react-native';
import {ScreenLayout, Header} from '../../Components/Layout';
import {useGetMatch} from './hooks/useGetMatch';

import t from '../../Theme/theme';

import {HDivider} from '../../Components/UI/HDivider';
import {MatchHeader} from '../../Components/Match/MatchHeader';
import {MatchInfo} from '../../Components/Match/MatchInfo';

import {MatchTabs} from '../../Components/Match/MatchTabs';
import {AddButton} from '../../Components/UI/AddButton';
import {BottomModal} from '../../Components/Modal/BottomModal';

import {NewPointModal} from '../../Components/Match/NewPointModal';
import {useLiveMatch} from '../../Components/Match/hooks/useLiveMatch';

import {useSavePlayersStats} from './hooks/useSavePlayerStats';
import {FinishedMatchHeader} from '../../Components/Match/FinishedMatchHeader';

import {MatchSettings} from '../../Components/Match/MatchSettings';
import {LoadingModal} from '../../Components/Common/LoadingModal';
import {ServiceModal} from '../../Components/Match/ServiceModal';
import {FinishedMatchModal} from '../../Components/Match/FinishedMatchModal';

export const MATCH_SCREEN_KEY = 'matchScreen';

export const MatchScreen: React.FC = ({route}) => {
  const {matchId} = route.params;
  const {
    notes,
    match,
    history,
    loadingMatch,
    isGameFinished,
    isMatchFinished,
    isStartTeamAssigned,
  } = useGetMatch(matchId);
  const {handleSavePoint, loading} = useLiveMatch(match);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {loading: loadingSaveStats, savePlayersStatsHandler} =
    useSavePlayersStats();

  return (
    <ScreenLayout>
      <LoadingModal
        isVisible={loadingSaveStats}
        text="Guardando stats de jugad@res"
      />

      <FinishedMatchModal
        isVisible={isGameFinished && !isMatchFinished}
        onAccept={() => savePlayersStatsHandler({match})}
      />
      <ServiceModal isVisible={isStartTeamAssigned} match={match} />
      {!loadingMatch && (
        <Header
          withBack
          title={match?.tournamentName || 'Partida'}
          rightSide={<MatchSettings match={match} />}
        />
      )}
      {isMatchFinished && (
        <AddButton
          iconName={isExpanded ? 'ios-contract' : 'ios-expand'}
          style={[t.bgSuccessLight]}
          onPress={() => setIsExpanded(old => !old)}
        />
      )}
      {!isMatchFinished && !isGameFinished && (
        <AddButton
          iconName="tennisball"
          style={[t.bgSuccessLight]}
          onPress={() => setIsModalVisible(true)}
        />
      )}
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
              {isMatchFinished ? (
                <>{!isExpanded && <FinishedMatchHeader match={match} />}</>
              ) : (
                <MatchHeader match={match} />
              )}
            </View>
            {!isExpanded && (
              <>
                <HDivider />
                <MatchInfo
                  tournamentName={match?.tournamentName}
                  round={match?.round}
                  club={match?.club}
                  date={match?.date.toDate()}
                  category={match?.category}
                />
                <HDivider />
              </>
            )}
            <View style={[t.flexGrow, t.mT5]}>
              <MatchTabs match={match} pointsHistory={history} notes={notes} />
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};
