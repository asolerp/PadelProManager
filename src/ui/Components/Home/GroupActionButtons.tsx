import React from 'react';
import {Text, View} from 'react-native';
import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_MATCH_SCREEN_KEY} from '../../Screens/NewMatch/NewMatch';

import t from '../../Theme/theme';
import {ActionButton} from '../UI/ActionButton';

const PLAYER_IMAGE =
  'https://as01.epimg.net/opinion/imagenes/2020/08/04/blogs/1596530816_341412_1596531068_noticia_normal.jpg';

export const GroupActionButton = () => {
  return (
    <View style={[t.mB7]}>
      <Text style={[t.fontSansBold, t.textLg, t.mB3]}>Acciones rápdias</Text>
      <View style={[t.flexRow]}>
        <ActionButton
          onPress={() => openScreenWithPush(NEW_MATCH_SCREEN_KEY)}
          iconName="tennisball"
          title="Añadir partido"
          style={[t.mR3]}
        />
        <ActionButton
          imageUrl={PLAYER_IMAGE}
          iconName="ios-person"
          title="Añadir jugador"
          type="success"
        />
      </View>
    </View>
  );
};
