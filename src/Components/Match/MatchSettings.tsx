import React, {useContext, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {useSavePlayersStats} from '../../Screens/Match/hooks/useSavePlayerStats';
import {showError} from './utils/alertErrorMessages';
import {useLiveMatch} from './hooks/useLiveMatch';
import {timeout} from '../../Utils/timeout';
import {LoadingModalContext} from '../Context/LoadngModalContext';
import {popScreen} from '../../Router/utils/actions';

export const MatchSettings = ({match}) => {
  const [isVisible, setIsModalVisible] = useState(false);
  const {savePlayersStatsHandler} = useSavePlayersStats();
  const {handleDeleteMatch} = useLiveMatch(match);
  const {setIsVisible} = useContext(LoadingModalContext);

  return (
    <>
      <BottomModal
        isVisible={isVisible}
        onClose={() => setIsModalVisible(false)}>
        <>
          <Text style={[t.fontSansBold, t.text2xl, t.mB5, t.textCenter]}>
            Opciones de partido
          </Text>
          <View>
            <ListItem iconName="ios-pencil" title="Editar resultado" />
            <ListItem
              iconName="tennisball"
              title="Finalizar partido"
              onPress={() => savePlayersStatsHandler({match})}
            />
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
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Icon name="ios-settings-sharp" size={22} />
      </Pressable>
    </>
  );
};
