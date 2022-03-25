import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {AmazingButton} from '../../Components/UI/AmazingButton';
import {openScreenWithPush} from '../../Router/utils/actions';

import t from '../../Theme/theme';
import {
  BANDEJAS,
  DERECHA,
  DERECHA_REVES,
  PARED,
  REMATE,
  REVES,
  SAQUE,
  VOLEA,
} from '../../Utils/constants';
import {EXERCICES_SCREEN_KEY} from '../Exercices/Exercicies';

export const Training = () => {
  return (
    <ScreenLayout>
      <Header title="Biblioteca de ejercicios" />
      <View style={[t.mT3]}>
        <Text style={[t.textLg, t.fontSans, t.textGray600]}>
          Accede a una gran cantidad de ejercicios para que puedas realizar con
          tus jugadores.
        </Text>
      </View>
      <ScrollView style={[t.mT7]}>
        <View style={[t.wFull, t.flexRow, t.justifyBetween, t.mB4]}>
          <AmazingButton
            mainColor="info"
            title="Derecha & Revés"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Derecha & Revés',
                group: DERECHA_REVES,
              })
            }
          />
          <View style={[t.mX2]} />
          <AmazingButton
            mainColor="info"
            title="Derecha"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Derecha',
                group: DERECHA,
              })
            }
          />
        </View>
        <View style={[t.wFull, t.flexRow, t.justifyBetween, t.mB4]}>
          <AmazingButton
            mainColor="info"
            title="Revés"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Revés',
                group: REVES,
              })
            }
          />
          <View style={[t.mX2]} />
          <AmazingButton
            mainColor="info"
            title="Volea"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Volea',
                group: VOLEA,
              })
            }
          />
        </View>
        <View style={[t.wFull, t.flexRow, t.justifyBetween, t.mB4]}>
          <AmazingButton
            mainColor="info"
            title="Pared"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Pared',
                group: PARED,
              })
            }
          />
          <View style={[t.mX2]} />
          <AmazingButton
            mainColor="info"
            title="Saque"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Saque',
                group: SAQUE,
              })
            }
          />
        </View>
        <View style={[t.wFull, t.flexRow, t.justifyBetween]}>
          <AmazingButton
            mainColor="info"
            title="Bandeja"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Bandeja',
                group: BANDEJAS,
              })
            }
          />
          <View style={[t.mX2]} />
          <AmazingButton
            mainColor="info"
            title="Remate"
            onPress={() =>
              openScreenWithPush(EXERCICES_SCREEN_KEY, {
                title: 'Remate',
                group: REMATE,
              })
            }
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
