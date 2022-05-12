import React, {useContext, useState} from 'react';
import {Linking, Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import {isFeatureEnabled, REGISTRY} from '../../Lib/FeatureToggle';

import PressableOpacity from '../UI/PressableOpacity';
import {useLogout} from '../../Hooks/useLogout';
import {AuthContext} from '../../Context/AuthContex';
import t from '../../Theme/theme';
import {
  APPLE_SUBSCRIPTION,
  PRIVACY_POLICY,
  TERMS_AND_CONDITION,
} from '../../Screens/Profile/utils/urls';

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
            {isFeatureEnabled(REGISTRY.FEATURE_SUBSCRIPTIONS) && (
              <>
                <Text style={[t.fontSans, t.pL4, t.mT4, t.mB2]}>Opciones</Text>
                {isCoach && (
                  <ListItem
                    onPress={() => {
                      Linking.openURL(APPLE_SUBSCRIPTION);
                    }}
                    iconName="ios-card-outline"
                    title="Subscripciones"
                  />
                )}
              </>
            )}
            <Text style={[t.fontSans, t.pL4, t.mT4, t.mB2]}>Legal</Text>
            <ListItem
              title="Términos y condiciones"
              onPress={() => Linking.openURL(TERMS_AND_CONDITION)}
            />
            <ListItem
              title="Pólitica de privacidad"
              onPress={() => Linking.openURL(PRIVACY_POLICY)}
            />
            <View style={[t.mT8]}>
              <ListItem
                withIcon={false}
                iconName="ios-exit-outline"
                title="Logout"
                onPress={() => logout()}
                textStyle={[t.textError]}
                iconColor="red"
              />
            </View>
          </View>
        </>
      </BottomModal>
      <PressableOpacity onPress={() => setIsVisible(true)}>
        <Icon name="ios-settings-sharp" size={25} />
      </PressableOpacity>
    </>
  );
};
