import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';

export const MatchSettings = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <BottomModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <>
          <Text style={[t.fontSansBold, t.text2xl, t.mB5, t.textCenter]}>
            Opciones de partido
          </Text>
          <View>
            <ListItem iconName="ios-pencil" title="Editar resultado" />
            <ListItem
              iconName="ios-trash"
              iconColor="#d32f2f"
              title="Eliminar partida"
              textStyle={[t.textErrorDark]}
            />
          </View>
        </>
      </BottomModal>
      <Pressable onPress={() => setIsVisible(true)}>
        <Icon name="ios-settings-sharp" size={22} />
      </Pressable>
    </>
  );
};
