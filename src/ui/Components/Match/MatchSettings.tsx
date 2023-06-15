import React, {useState} from 'react';
import {View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {useSavePlayersStats} from '../../Screens/Match/hooks/useSavePlayerStats';
import {infoAlert, showError} from './utils/alertErrorMessages';
import {useLiveMatch} from './hooks/useLiveMatch';
import {timeout} from '../../Utils/timeout';

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

  const onDeleteMatch = async () => {
    setIsModalVisible(false);
    await timeout(500);
    await handleDeleteMatch();
  };

  const onFinishMatch = async () => {
    setIsModalVisible(false);
    await timeout(500);
    await savePlayersStatsHandler();
  };

  return (
    <>
      {editModalVisible && (
        <EditResultModal
          isVisible={true}
          onClose={() => setEditModalVisible(false)}
          match={match}
        />
      )}
      {isVisible && (
        <BottomModal
          title="Opciones"
          isVisible={true}
          onClose={() => setIsModalVisible(false)}>
          <>
            <View>
              <ListItem
                iconName="ios-pencil"
                title="Editar resultado"
                onPress={async () => {
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
                      onAccept: async () => {
                        await onFinishMatch();
                      },
                    })
                  }
                />
              )}
              <ListItem
                onPress={() =>
                  showError.delete_match({
                    onAccept: async () => {
                      await onDeleteMatch();
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
      )}
      <PressableOpacity onPress={() => setIsModalVisible(true)}>
        <Icon name="ios-settings-sharp" size={22} />
      </PressableOpacity>
    </>
  );
};
