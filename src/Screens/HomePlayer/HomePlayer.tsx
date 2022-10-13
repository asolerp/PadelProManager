import React, {useContext} from 'react';

import {View, Text, ScrollView} from 'react-native';
import {RadarChart} from '../../Components/Common/RadarChart';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';

import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useGetPlayer} from './hooks/useGetPlayer';

import {ResumenStatistic} from '../../Components/Match/ResumenStatistic';
import {MyTodaySessions} from '../../Components/Home/MyTodaySessions';

import {PlayerHeader} from '../../Components/HomePlayer/PlayerHeader';

import {PlayerLiveMatches} from '../../Components/Player/PlayerLiveMatches';

import {Banner} from '../../Components/UI/Banner';
import {AuthContext} from '../../Context/AuthContex';
import {PendingRelationModal} from '../../Components/HomePlayer/PendingRelationModal';
import {useCheckPendingRelation} from './hooks/useCheckPendingRelation';
import {useShareApp} from './hooks/useShareApp';
import {useHideBootSplash} from '../../Hooks/useHideBootSplash';
import {useGetTodaySession} from './hooks/useGetTodaySession';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useGetConversationId} from './hooks/useGetConversationId';
import {openScreenWithPush} from '../../Router/utils/actions';
import {CHAT_SCREEN_KEY} from '../Chat/Chat';
import {useInAppMessaging} from '../../Hooks/useInAppMessaging';
import {useGetProMatches} from './hooks/useGetProMatches';
import {ProMatchSkeleton} from '../../Components/Home/skeleton/ProMatchSkeleton';
import {ProMatchesList} from '../../Components/Home/ProMatchesList';
import {useTranslationWrapper} from '../../Hooks/useTranslationsWrapper';
import {useGetCoachTips} from './hooks/useGetCoachTips';
import {CoachCard} from '../../Components/HomePlayer/CoachCard';

export const HOME_PLAYER_SCREEN_KEY = 'playerScreen';

export const HomePlayerScreen = () => {
  const {user} = useContext(AuthContext);
  const {tw, tl, tm, graphData, playerStats} = useGetPlayer();
  const {pendingRelation} = useCheckPendingRelation();
  const {handleShare} = useShareApp();
  const {sessions} = useGetTodaySession();
  const {proMatches, loading} = useGetProMatches();
  const {tip} = useGetCoachTips();
  const {conversationId, coach, loading: loadingCoach} = useGetConversationId();
  const {loc} = useTranslationWrapper();

  useHideBootSplash();
  useInAppMessaging();

  return (
    <ScreenLayout>
      {user?.coachId && (
        <PressableOpacity
          onPress={() =>
            openScreenWithPush(CHAT_SCREEN_KEY, {
              conversationId,
              chatTitle: `${coach.firstName} ${coach?.secondName}`,
            })
          }
          style={[
            t.w14,
            t.h14,
            t.roundedFull,
            t.bgWarningDark,
            t.shadow,
            t.absolute,
            t.justifyCenter,
            t.itemsCenter,
            t.z50,
            t.right5,
            t.bottom10,
          ]}>
          <Icon name="chatbox-ellipses" size={25} color="white" />
        </PressableOpacity>
      )}
      <PendingRelationModal relations={pendingRelation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <PlayerHeader />
        {user?.coachId && (
          <>
            {loadingCoach ? (
              <View style={[t.pX4, t.mB5]}>
                <ProMatchSkeleton />
              </View>
            ) : (
              <View style={[t.pX4, t.mB5]}>
                <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
                  Tu entrenador
                </Text>
                <CoachCard coach={coach} />
              </View>
            )}
          </>
        )}
        {user?.coachId && (
          <View style={[t.mB5, t.pX4]}>
            <MyTodaySessions sessions={sessions} />
          </View>
        )}
        <View style={[t.pX4]}>
          {loading ? (
            <View style={[t.mB5]}>
              <ProMatchSkeleton />
            </View>
          ) : (
            <>
              {proMatches?.length > 0 && (
                <View style={[t.mB5]}>
                  <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
                    {loc('home_screen_wpt_match_title')}
                  </Text>
                  <ProMatchesList proMatches={proMatches} />
                </View>
              )}
            </>
          )}
        </View>
        {/* {!user?.coachId && (
          <View style={[t.pX4, t.mB5]}>
            <Banner
              mainColor="warning"
              onPress={() => handleShare()}
              ctaText="INFORMAR ENTRENADOR"
              title="Avisa a tu entrenador"
              subtitle="Hazle saber a tu entrenador de PadelPro para que pueda llevar un seguimiento de tus logros y tu evolución."
            />
          </View>
        )} */}
        <View style={[t.pX4]}>
          <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
            Mis estadísticas
          </Text>
          <View style={[t.itemsCenter]}>
            <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
              <Stat label="Jugados" count={tm} />
              <Stat label="Ganados" count={tw} />
              <Stat label="Perdidos" count={tl} />
            </View>
          </View>
          <View style={[t.itemsCenter]}>
            {graphData && (
              <>
                <RadarChart
                  captions={graphData?.captions}
                  data={graphData?.chart}
                  options={graphData?.options}
                  size={graphData?.size}
                />
                <View style={[t.mT2]}>
                  <ResumenStatistic
                    withBlur={false}
                    statistics={playerStats?.dataSets}
                  />
                </View>
              </>
            )}
          </View>
          {user?.coachId && (
            <View style={[t.mT5]}>
              <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
                Tips de tu entrenador
              </Text>
              {tip ? (
                <Text style={[t.fontSans, t.textLg]}>{tip.content}</Text>
              ) : (
                <Text>
                  En estos momentos no tienes ninguna tip de tu entrenador
                </Text>
              )}
            </View>
          )}
          <View style={[t.mT5, t.mB5]}>
            <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
              Partidos activos
            </Text>
            <PlayerLiveMatches userEmail={user?.email} />
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
