import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_MATCH_SCREEN_KEY} from '../NewMatch/NewMatch';
import {useGetMatches} from '../../Hooks/useGetMatches';
import {MatchResume} from '../../Components/Home/MatchResume';

export const MATCHES_SCREE_KEY = 'matchesScreen';

export const Matches = () => {
  const {matches} = useGetMatches();

  return (
    <ScreenLayout>
      <Header
        title="Historial de partidas"
        rightSide={
          <Pressable onPress={() => openScreenWithPush(NEW_MATCH_SCREEN_KEY)}>
            <Icon name="ios-add-circle-outline" size={25} />
          </Pressable>
        }
      />
      {matches?.length === 0 ? (
        <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
          <Text style={[t.fontSans]}>No tienes ningúna partida</Text>
        </View>
      ) : (
        <View style={[t.mT10]}>
          {matches?.map(match => (
            <MatchResume key={match?.id} match={match} />
          ))}
        </View>
      )}
    </ScreenLayout>
  );
};
