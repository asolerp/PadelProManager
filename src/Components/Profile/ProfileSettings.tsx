import React, {useState} from 'react';
import {Linking, Text, View} from 'react-native';
import {BottomModal} from '../Modal/BottomModal';
import {ListItem} from '../UI/ListItem';
import Icon from 'react-native-vector-icons/Ionicons';
import {isFeatureEnabled, REGISTRY} from '../../Lib/FeatureToggle';

import PressableOpacity from '../UI/PressableOpacity';
import {useLogout} from '../../Hooks/useLogout';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import t from '../../Theme/theme';
import {
  APPLE_SUBSCRIPTION,
  PRIVACY_POLICY,
  TERMS_AND_CONDITION,
} from '../../Screens/Profile/utils/urls';
import {leaveCoachAlert} from './utils/leaveCoachAlert';
import {defaultFunctions} from '../../Lib/API/firebaseApp';
import {useContext} from 'react';
import {LoadingModalContext} from '../../Context/LoadingModalContext';
import {timeout} from '../../Utils/timeout';
import {userQuery} from '../../Api/queries';

export const ProfileSettings = () => {
  const {isCoach, user, setUser} = useFirebaseAuth();
  const [isVisible, setIsVisible] = useState(false);
  const {setIsVisible: setIsVisibleLoading, setText} =
    useContext(LoadingModalContext);
  const {logout} = useLogout();

  const leaveCoachFn = defaultFunctions.httpsCallable('leaveCoach');

  const handleLeaveCoach = async () => {
    try {
      setText('Dejando entrenador...');
      setIsVisible(false);
      await timeout(1000);
      setIsVisibleLoading(true);
      await timeout(2000);
      await leaveCoachFn({
        playerEmail: user?.email,
        playerId: user?.id,
        coachId: user?.coachId,
      });
      const userUpdatedQuery = await userQuery.doc(user?.id).get();
      const userDoc = {id: userUpdatedQuery.id, ...userUpdatedQuery.data()};
      setUser({loggedIn: true, ...userDoc});
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisibleLoading(false);
    }
  };

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
            {!isCoach && (
              <>
                <Text style={[t.fontSans, t.pL4, t.mT4, t.mB2]}>General</Text>
                <ListItem
                  title="Dejar al entrenador"
                  onPress={() =>
                    leaveCoachAlert({
                      onAccept: async () => await handleLeaveCoach(),
                    })
                  }
                />
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
