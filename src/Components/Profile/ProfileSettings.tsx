import React, {useContext, useState} from 'react';
import {Linking, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';

import PressableOpacity from '../UI/PressableOpacity';
import {useLogout} from '../../Hooks/useLogout';
import {AuthContext} from '../../Context/AuthContex';
import t from '../../Theme/theme';

export const ProfileSettings = () => {
  const {isCoach} = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const {logout} = useLogout();

  return (
    <>
      <BottomModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        title="Opciones">
        <>
          <View>
            {isCoach && (
              <ListItem
                onPress={() => {
                  Linking.openURL(
                    'https://apps.apple.com/account/subscriptions',
                  );
                }}
                iconName="ios-card-outline"
                title="Subscripciones"
              />
            )}
            <ListItem
              iconName="ios-exit-outline"
              title="Logout"
              onPress={() => logout()}
            />
          </View>
        </>
      </BottomModal>
      <PressableOpacity onPress={() => setIsVisible(true)}>
        <Icon name="ios-settings-sharp" size={25} />
      </PressableOpacity>
    </>
  );
};
