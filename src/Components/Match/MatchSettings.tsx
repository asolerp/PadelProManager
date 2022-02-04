import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {useSavePlayersStats} from '../../Screens/Match/hooks/useSavePlayerStats';
import {infoAlert, showError} from './utils/alertErrorMessages';
import {useLiveMatch} from './hooks/useLiveMatch';
import {timeout} from '../../Utils/timeout';

import {popScreen} from '../../Router/utils/actions';
import {EditResultModal} from './EditResultModal';
import PressableOpacity from '../UI/PressableOpacity';

export const MatchSettings = ({match}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isVisible, setIsModalVisible] = useState(false);
  const {savePlayersStatsHandler} = useSavePlayersStats(match);
  const {handleDeleteMatch} = useLiveMatch(match);

  const openModal = async () => {
    await timeout(500);
    setEditModalVisible(true);
  };

  return (
    <>
      <EditResultModal
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        match={match}
      />
      <BottomModal
        isVisible={isVisible}
        onClose={() => setIsModalVisible(false)}>
        <>
          <Text style={[t.fontSansBold, t.text2xl, t.mB5, t.textCenter]}>
            Opciones de partido
          </Text>
          <View>
            <ListItem
              iconName="ios-pencil"
              title="Editar resultado"
              onPress={async () => {
                console.log('hola');
                setIsModalVisible(false);
                openModal();
              }}
            />
            {match?.state !== 'finished' && (
              <ListItem
                iconName="tennisball"
                title="Finalizar partido"
                onPress={() =>
                  infoAlert.finish_match({
                    onAccept: () => {
                      setIsModalVisible(false);
                      savePlayersStatsHandler();
                    },
                  })
                }
              />
            )}
            <ListItem
              onPress={() =>
                showError.delete_match({
                  onAccept: async () => {
                    setIsModalVisible(false);
                    popScreen();
                    await timeout(1000);
                    // await setIsVisible(true);
                    await handleDeleteMatch();
                  },
                })
              }
              iconName="ios-trash"
              iconColor="#d32f2f"
              title="Eliminar partida"
              textStyle={[t.textErrorDark]}
            />
          </View>
        </>
      </BottomModal>
      <PressableOpacity onPress={() => setIsModalVisible(true)}>
        <Icon name="ios-settings-sharp" size={22} />
      </PressableOpacity>
    </>
  );
};
