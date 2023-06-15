import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, Linking} from 'react-native';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PROFILE_SCREEN_KEY} from '../../Screens/Profile/Profile';
import {SubscriptionContext} from '../../Context/SubscriptionContext';
import {isFeatureEnabled, REGISTRY} from '../../Lib/FeatureToggle';
import {
  APPLE_SUBSCRIPTION,
  PRIVACY_POLICY,
  TERMS_AND_CONDITION,
} from '../../Screens/Profile/utils/urls';
import {ListItem} from '../UI/ListItem';
import {leaveCoachAlert} from '../Profile/utils/leaveCoachAlert';
import {useConfigProfile} from './hooks/useConfigProfile';
import {useLogout} from '../../Hooks/useLogout';
import {COACH_CODE_SCREEN_KEY} from '../../Screens/CoachCode/CoachCode';
import {HDivider} from '../UI/HDivider';

export const CustomDrawer = props => {
  const {user, isCoach, isAdmin} = useFirebaseAuth();
  const {isSubscribed} = useContext(SubscriptionContext);
  const {handleLeaveCoach} = useConfigProfile();
  const {logout} = useLogout();
  return (
    <View style={[t.flex1]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: t.bgGray700.backgroundColor}}>
        <View style={[t.pX4, t.pY8, t.justifyStart, t.itemsStart]}>
          <Avatar
            imageStyle={[t.w16, t.h16]}
            style={[t.mB2]}
            img={user?.profileImg}
            onPress={() => openScreenWithPush(PROFILE_SCREEN_KEY)}
          />
          <Text style={[t.fontSansBold, t.textWhite]}>
            {user?.firstName} {user?.secondName}
          </Text>
          {isSubscribed || isAdmin ? (
            <Text style={[t.fontSansMedium, t.textXs, t.textWarningLight]}>
              Premium
            </Text>
          ) : (
            <Text style={[t.fontSansMedium, t.textXs, t.textGray500]}>
              Cuenta normal
            </Text>
          )}
        </View>
        <View style={[t.flex1, t.bgWhite, t.pT2]}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <HDivider />
      <View style={[t.pL2, t.mT3]}>
        {isFeatureEnabled(REGISTRY.FEATURE_SUBSCRIPTIONS) && (
          <>
            {isCoach && (
              <ListItem
                withIcon={false}
                onPress={() => {
                  Linking.openURL(APPLE_SUBSCRIPTION);
                }}
                title="Subscripciones"
              />
            )}
          </>
        )}
        {!isCoach && (
          <>
            {!user?.coachId ? (
              <ListItem
                title="Insertar código de entrenador"
                onPress={async () => {
                  openScreenWithPush(COACH_CODE_SCREEN_KEY);
                }}
              />
            ) : (
              <ListItem
                title="Dejar al entrenador"
                onPress={() =>
                  leaveCoachAlert({
                    onAccept: async () => await handleLeaveCoach(),
                  })
                }
              />
            )}
          </>
        )}

        <ListItem
          title="Términos y condiciones"
          withIcon={false}
          onPress={() => Linking.openURL(TERMS_AND_CONDITION)}
        />
        <ListItem
          title="Pólitica de privacidad"
          withIcon={false}
          onPress={() => Linking.openURL(PRIVACY_POLICY)}
        />

        <ListItem
          withIcon={false}
          iconName="ios-exit-outline"
          title="Logout"
          onPress={() => logout()}
          textStyle={[t.textError]}
          containerStyle={[t.pB10]}
          iconColor="red"
        />
      </View>
    </View>
  );
};
