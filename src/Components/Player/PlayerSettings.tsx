import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {openScreenWithPush, popScreen} from '../../Router/utils/actions';
import {NEW_PLAYER_SCREEN_KEY} from '../../Screens/NewPlayer/NewPlayer';
import {useDeleteDocument} from '../../Hooks/useDeleteDocument';
import {playerQuery} from '../../Api/queries';
import {LoadingModal} from '../Common/LoadingModal';

export const PlayerSettings = ({playerId}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {deleteDocument, loading} = useDeleteDocument(playerQuery);
  return (
    <>
      <LoadingModal text="Borrando jugador" isVisible={loading} />
      <BottomModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <>
          <Text style={[t.fontSansBold, t.text2xl, t.mB5, t.textCenter]}>
            Opciones
          </Text>
          <View>
            <ListItem
              iconName="ios-pencil"
              title="Editar jugador"
              onPress={() => {
                openScreenWithPush(NEW_PLAYER_SCREEN_KEY, {
                  edit: true,
                  playerId,
                });
                setIsVisible(false);
              }}
            />
            <ListItem
              onPress={() => {
                deleteDocument({
                  docId: playerId,
                  callback: () => {
                    setIsVisible(false);
                    popScreen();
                  },
                });
              }}
              iconName="ios-trash"
              iconColor="#d32f2f"
              title="Eliminar jugador"
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
