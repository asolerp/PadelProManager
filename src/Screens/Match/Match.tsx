import React, {useState} from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
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

import Icon from 'react-native-vector-icons/Ionicons';
import {useSavePlayersStats} from './hooks/useSavePlayerStats';
import {FinishedMatchHeader} from '../../Components/Match/FinishedMatchHeader';
import {format} from 'date-fns';
import {DATE_FORM} from '../../Utils/date-ext';
import {MatchSettings} from '../../Components/Match/MatchSettings';

export const MATCH_SCREEN_KEY = 'matchScreen';

export const MatchScreen: React.FC = ({route}) => {
  const {matchId} = route.params;
  const {
    notes,
    match,
    history,
    loadingMatch,
    isMatchFinished,
    isStartTeamAssigned,
  } = useGetMatch(matchId);
  const {handleSavePoint, handleWhoStarts, loading} = useLiveMatch(match);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {savePlayersStatsHandler, loading: loadingSaveStats} =
    useSavePlayersStats();

  return (
    <ScreenLayout>
      <NormalModal isVisible={loadingSaveStats} onClose={() => {}}>
        <View style={[t.justifyCenter, t.itemsCenter]}>
          <ActivityIndicator size="large" color="black" style={[t.mB4]} />
          <Text style={[t.fontSansMedium, t.textCenter, t.w32]}>
            Guardando stats de jugadores
          </Text>
        </View>
      </NormalModal>
      {!loadingMatch && (
        <Header
          withBack
          title={
            match?.tournamentName ||
            'Partida ' + format(match?.date?.toDate(), DATE_FORM)
          }
          rightSide={<MatchSettings />}
        />
      )}
      {!isMatchFinished ? (
        <AddButton
          iconName="tennisball"
          style={[t.bgSuccessLight]}
          onPress={() => setIsModalVisible(true)}
        />
      ) : (
        <AddButton
          iconName={isExpanded ? 'ios-contract' : 'ios-expand'}
          style={[t.bgSuccessLight]}
          onPress={() => setIsExpanded(old => !old)}
        />
      )}
      <NormalModal isVisible={isStartTeamAssigned} onClose={() => {}}>
        <View style={[t.itemsCenter]}>
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
