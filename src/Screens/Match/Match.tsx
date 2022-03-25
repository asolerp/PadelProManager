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

import {useSavePlayersStats} from './hooks/useSavePlayerStats';
import {FinishedMatchHeader} from '../../Components/Match/FinishedMatchHeader';

import {MatchSettings} from '../../Components/Match/MatchSettings';
import {LoadingModal} from '../../Components/Common/LoadingModal';
import {ServiceModal} from '../../Components/Match/ServiceModal';
import {FinishedMatchModal} from '../../Components/Match/FinishedMatchModal';
import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_POINT_SCREEN_KEY} from '../NewPoint/NewPoint';
import {usePermissions} from '../../Hooks/usePermissions';
import {MatchHeaderSkeleton} from '../../Components/Match/skeleton/MatchHeaderSkeleton';
import {MatchInfoSkeleton} from '../../Components/Match/skeleton/MatchInfoSkeleton';

export const MATCH_SCREEN_KEY = 'matchScreen';

export const MatchScreen: React.FC = ({route}) => {
  const {matchId} = route.params;
  const {notes, match, history, loadingMatch, isGameFinished, isMatchFinished} =
    useGetMatch(matchId);

  const [isExpanded, setIsExpanded] = useState(false);
  const {getIsOwner} = usePermissions();

  const isOnwer = getIsOwner(match?.owner);
  const showAddPointButton = !isMatchFinished && !isGameFinished && isOnwer;

  const {loading: loadingSaveStats, savePlayersStatsHandler} =
    useSavePlayersStats(match);

  return (
    <ScreenLayout edges={['top', 'left', 'right', 'bottom']}>
      <LoadingModal
        isVisible={loadingSaveStats}
        text="Guardando stats de jugadores"
      />

      <FinishedMatchModal
        isVisible={isGameFinished && !isMatchFinished}
        onAccept={() => savePlayersStatsHandler()}
      />
      {!loadingMatch && <ServiceModal match={match} />}
      {!loadingMatch && (
        <Header
          withBack
          title={match?.tournamentName || 'Partida'}
          rightSide={isOnwer && <MatchSettings match={match} />}
        />
      )}
      {isMatchFinished && (
        <AddButton
          iconName={isExpanded ? 'ios-contract' : 'ios-expand'}
          style={[t.bgSuccessLight]}
          onPress={() => setIsExpanded(old => !old)}
        />
      )}
      {showAddPointButton && (
        <AddButton
          iconName="tennisball"
          style={[t.bgSuccessLight]}
          onPress={() =>
            openScreenWithPush(NEW_POINT_SCREEN_KEY, {
              matchId: match?.id,
            })
          }
        />
      )}
      <View style={[t.flex1]}>
        {!loadingMatch && (
          <>
            <View style={[t.mB5]}>
              {isMatchFinished ? (
                <>{!isExpanded && <FinishedMatchHeader match={match} />}</>
              ) : (
                <View style={[t.mT5]}>
                  {match?.game ? (
                    <MatchHeader match={match} />
                  ) : (
                    <MatchHeaderSkeleton />
                  )}
                </View>
              )}
            </View>
            {!isExpanded && (
              <>
                <HDivider />
                {match?.game ? (
                  <MatchInfo
                    tournamentName={match?.tournamentName}
                    round={match?.round}
                    club={match?.club}
                    date={match?.date.toDate()}
                    category={match?.category}
                  />
                ) : (
                  <MatchInfoSkeleton />
                )}

                <HDivider />
              </>
            )}
            <View style={[t.flexGrow, t.mT5]}>
              {match && (
                <MatchTabs
                  match={match}
                  pointsHistory={history}
                  notes={notes}
                />
              )}
            </View>
          </>
        )}
      </View>
    </ScreenLayout>
  );
};
