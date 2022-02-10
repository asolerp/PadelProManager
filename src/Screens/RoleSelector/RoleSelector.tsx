import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {ScreenLayout} from '../../Components/Layout';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSetUserRole} from './hooks/useSetUserRole';

export const RoleSelector = () => {
  const {handleUpdateRole} = useSetUserRole();
  return (
    <ScreenLayout edges={['top', 'bottom']} style={[t.bgBlack]}>
      <View style={[t.flexGrow, t.itemsCenter, t.justifyCenter]}>
        <Text style={[t.fontSansBold, t.text5xl, t.textWhite]}>
          ¿Cual es tu rol?
        </Text>
        <View style={[t.mT10, t.flexRow, t.wFull, t.justifyAround]}>
          <Pressable
            style={[t.itemsCenter]}
            onPress={() => handleUpdateRole('coach')}>
            <Icon name="ios-person" color="white" size={40} />
            <Text style={[t.fontSansMedium, t.text2xl, t.textWhite, t.mT3]}>
              ENTRENADOR
            </Text>
          </Pressable>
          <Pressable
            style={[t.itemsCenter]}
            onPress={() => handleUpdateRole('player')}>
            <Icon name="tennisball" color="white" size={40} />
            <Text style={[t.fontSansMedium, t.text2xl, t.textWhite, t.mT3]}>
              JUGADOR
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenLayout>
  );
};
