import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Exercice} from '../../Components/Common/Exercice';

import {Header, ScreenLayout} from '../../Components/Layout';
import {HDivider} from '../../Components/UI/HDivider';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import t from '../../Theme/theme';

import {useGetExercices} from './hooks/useGetExercices';
export const EXERCICES_SCREEN_KEY = 'exercicesScreen';

export const Exercices = ({route}) => {
  const {group, title} = route?.params;
  const {exercices, onRefresh, refreshing, handleClickMoreExercises} =
    useGetExercices({group});

  const renderItem = ({item}) => {
    return (
      <>
        <Exercice
          level={item?.level}
          duration={item?.duration}
          objective={item?.objective}
          description={item?.description}
          image={item?.image?.url}
        />
        <HDivider style={[t.mY3]} />
      </>
    );
  };

  return (
    <ScreenLayout edges={['top', 'bottom']} style={[t.pB10]}>
      <Header withBack title={title} />
      <HDivider />
      <FlatList
        data={exercices}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={[t.mT2, t.justifyCenter, t.itemsCenter]}>
            <Text style={[t.textCenter]}>
              ¿Te interesaría acceder a más ejercicios?
            </Text>
            <PressableOpacity
              style={[t.mT3]}
              onPress={handleClickMoreExercises}>
              <Text style={[t.fontSansMedium]}>Haz click aquí</Text>
            </PressableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={[t.mT5, t.flex, t.pX4]}
      />
    </ScreenLayout>
  );
};
