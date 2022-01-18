import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';

import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_MATCH_SCREEN_KEY} from '../NewMatch/NewMatch';

export const MATCHES_SCREE_KEY = 'matchesScreen';

const matches = [];

export const Matches = () => {
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
      {matches?.length === 0 && (
        <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
          <Text style={[t.fontSans]}>No tienes ningúna partida</Text>
        </View>
      )}
    </ScreenLayout>
  );
};
