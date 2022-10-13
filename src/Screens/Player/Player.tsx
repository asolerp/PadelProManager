import React from 'react';

import {View, Text, FlatList, TextInput, ActivityIndicator} from 'react-native';

import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Stat} from '../../Components/Player/Stat';
import {Avatar as PlayerAvatar} from '../../Components/UI/Avatar';
import t from '../../Theme/theme';
import {MatchResume} from '../../Components/Home/MatchResume';

import {useGetPlayer} from './hooks/useGetPlayer';
import {Header} from '../../Components/Layout/Header';

import Icon from 'react-native-vector-icons/Ionicons';

import {useGetMatches} from '../../Hooks/useGetMatches';
import {
  categoryParse,
  colorByCategory,
  colorByHand,
  handParse,
} from '../../Utils/parsers';
import {Chip} from '../../Components/UI/Chip';
import {PlayerSettings} from '../../Components/Player/PlayerSettings';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {openScreenWithPush} from '../../Router/utils/actions';

import {CHAT_SCREEN_KEY} from '../Chat/Chat';
import {useTips} from './hooks/useTips';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

export const PLAYER_SCREEN_KEY = 'playerScreen';

export const PlayerScreen = ({route}) => {
  const {player, tw, tl, tm, loading, conversationId} = useGetPlayer(
    route?.params?.playerId,
  );
  const {matches} = useGetMatches(route?.params?.playerEmail);
  const {
    handleSaveTips,
    localTip,
    setLocalTip,
    loading: loadingTip,
  } = useTips({
    playerEmail: player?.email,
  });
  const renderItem = ({item}) => <MatchResume match={item} />;

  return (
    <ScreenLayout edges={['top', 'left', 'right', 'bottom']}>
      <Header
        withBack
        position="absolute"
        rightSide={<PlayerSettings playerId={player?.id} />}
      />
      <KeyboardAwareFlatList
        ListHeaderComponent={
          <>
            <View style={[t.mT5]}>
              <View style={[t.justifyCenter, t.itemsCenter]}>
                <PlayerAvatar
                  img={player?.profileImg}
                  imageStyle={[t.w28, t.h28]}
                />
                <View style={[t.flexRow]}>
                  <Text style={[t.fontSansBold, t.textLg, t.mT2, t.mR1]}>
                    {`${player?.firstName} ${player?.secondName}`.replace(
                      / +(?= )/g,
                      '',
                    )}
                  </Text>
                  {player?.active && (
                    <PressableOpacity
                      style={[t.p1, t.bgWhite, t.roundedFull]}
                      onPress={() =>
                        openScreenWithPush(CHAT_SCREEN_KEY, {
                          conversationId,
                          chatTitle:
                            `${player.firstName} ${player.secondName}`.replace(
                              / +(?= )/g,
                              '',
                            ),
                        })
                      }>
                      <Icon name="chatbox-ellipses" size={25} />
                    </PressableOpacity>
                  )}
                </View>
                <View style={[t.flexRow, t.itemsCenter, t.mT3]}>
                  <View style={[t.flexRow, t.itemsCenter, t.mR2]}>
                    <Text style={[t.fontSans, t.textXs, t.textGray800, t.mR1]}>
                      Categoría:
                    </Text>
                    {player?.category ? (
                      <Chip
                        mainColor={colorByCategory[player?.category || 3]}
                        text={`${categoryParse[player?.category || 3]}`}
                        style={[t.mR1]}
                      />
                    ) : (
                      <Chip
                        mainColor="error"
                        text="Sin definir"
                        style={[t.mR1]}
                      />
                    )}
                  </View>
                  <View style={[t.flexRow, t.itemsCenter]}>
                    <Text style={[t.fontSans, t.textXs, t.textGray800, t.mR1]}>
                      Mano:
                    </Text>
                    {player?.hand ? (
                      <Chip
                        mainColor={colorByHand[player?.hand || 'right']}
                        text={`${handParse[player?.hand || 'right']}`}
                      />
                    ) : (
                      <Chip
                        mainColor="error"
                        text="Sin definir"
                        style={[t.mR1]}
                      />
                    )}
                  </View>
                </View>
                <View style={[t.flexRow, t.justifyBetween, t.w60, t.mT5]}>
                  <Stat label="Jugados" count={tm} />
                  <Stat label="Ganados" count={tw} />
                  <Stat label="Perdidos" count={tl} />
                </View>
              </View>
              <View style={[t.itemsCenter]}>
                {!loading && (
                  <>
                    <View style={[t.wFull]}>
                      {/* <ResumenStatistic statistics={graphData?.dataSets} /> */}
                    </View>
                  </>
                )}
              </View>
              <View style={[t.mT5]}>
                <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
                  Tips para tu jugador
                </Text>
                <View
                  style={[
                    t.border0_5,
                    t.borderGray200,
                    t.pX4,
                    t.pY2,
                    t.roundedSm,
                  ]}>
                  <TextInput
                    placeholder="Añade tips a tu jugador"
                    multiline
                    value={localTip}
                    onChangeText={setLocalTip}
                  />
                  {localTip ? (
                    <>
                      {loadingTip ? (
                        <View style={[t.selfEnd, t.mT4]}>
                          <ActivityIndicator />
                        </View>
                      ) : (
                        <PressableOpacity
                          style={[t.selfEnd, t.mT4]}
                          onPress={handleSaveTips}>
                          <Text style={[t.fontSansBold, t.textInfoDark]}>
                            Guardar
                          </Text>
                        </PressableOpacity>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View style={[t.mT5]}>
                <Text style={[t.textXl, t.fontSansBold, t.mB5]}>
                  Últimos partidos
                </Text>
                {matches?.length === 0 && (
                  <Text style={[t.fontSansMedium]}>
                    No hay partidas finalizadas
                  </Text>
                )}
                <View />
              </View>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        data={matches}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={[t.pX4]}
      />
    </ScreenLayout>
  );
};
