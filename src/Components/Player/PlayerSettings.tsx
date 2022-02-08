import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {openScreenWithPush, popScreen} from '../../Router/utils/actions';
import {NEW_PLAYER_SCREEN_KEY} from '../../Screens/NewPlayer/NewPlayer';

import {LoadingModal} from '../Common/LoadingModal';
import PressableOpacity from '../UI/PressableOpacity';
import useRecursiveDelete from '../../Hooks/useRecursiveDelete';
import {showError} from './utils/alertErrorMessages';
import {LoadingModalContext} from '../../Context/LoadingModalContext';
import {timeout} from '../../Utils/timeout';

export const PlayerSettings = ({playerId}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {setIsVisible: setIsVisibleLoading, setText} =
    useContext(LoadingModalContext);

  const handleDeleteMatch = async () => {
    setText('Eliminando jugador...');
    setIsVisibleLoading(true);
    try {
      recursiveDelete();
    } catch (err) {
      console.log(err);
    }
  };

  const {recursiveDelete, loading} = useRecursiveDelete({
    path: `players/${playerId}`,
    callback: () => {
      setIsVisible(false);
      setIsVisibleLoading(false);
      popScreen();
    },
  });

  return (
    <>
      <LoadingModal text="Borrando jugador" isVisible={loading} />
      <BottomModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        title="Opciones">
        <>
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
              onPress={() =>
                showError.delete_player({
                  onAccept: async () => {
                    setIsVisible(false);
                    await timeout(1000);
                    // await setIsVisible(true);
                    await handleDeleteMatch();
                  },
                })
              }
              iconName="ios-trash"
              iconColor="#d32f2f"
              title="Eliminar jugador"
              textStyle={[t.textErrorDark]}
            />
          </View>
        </>
      </BottomModal>
      <PressableOpacity onPress={() => setIsVisible(true)}>
        <Icon name="ios-settings-sharp" size={22} />
      </PressableOpacity>
    </>
  );
};
