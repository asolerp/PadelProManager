import React from 'react';
import {FlatList} from 'react-native';
import {Exercice} from '../../Components/Common/Exercice';

import {Header, ScreenLayout} from '../../Components/Layout';
import {HDivider} from '../../Components/UI/HDivider';
import t from '../../Theme/theme';

import {useGetExercices} from './hooks/useGetExercices';
export const EXERCICES_SCREEN_KEY = 'exercicesScreen';

export const Exercices = ({route}) => {
  const {group, title} = route?.params;
  const {exercices, onRefresh, refreshing} = useGetExercices({group});

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
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={[t.mT5, t.flex, t.pX4]}
      />
    </ScreenLayout>
  );
};
