import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {popScreen} from '../../Router/utils/actions';

import {useDeleteDocument} from '../../Hooks/useDeleteDocument';
import {playerQuery} from '../../Api/queries';

import PressableOpacity from '../UI/PressableOpacity';
import auth from '@react-native-firebase/auth';

export const ProfileSettings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {deleteDocument, loading} = useDeleteDocument(playerQuery);

  const logOut = async () => {
    try {
      await auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BottomModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <>
          <Text style={[t.fontSansBold, t.text2xl, t.mB5, t.textCenter]}>
            Opciones
          </Text>
          <View>
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
              title="Subscripciones"
              textStyle={[t.textErrorDark]}
            />
            <ListItem
              iconName="ios-pencil"
              title="Logout"
              onPress={() => logOut()}
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
