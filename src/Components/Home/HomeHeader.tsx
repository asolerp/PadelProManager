import React, {useContext} from 'react';

import {View} from 'react-native';

import {openDrawer, openScreenWithPush} from '../../Router/utils/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import {PROFILE_SCREEN_KEY} from '../../Screens/Profile/Profile';
import t from '../../Theme/theme';
import {Header} from '../Layout';
import {Avatar} from '../UI/Avatar';
import {WelcomeMessage} from './WelcomeMessage';
import PressableOpacity from '../UI/PressableOpacity';
import {MESSAGES_SCREEN_KEY} from '../../Screens/Messages/Messages';
import {useGetNoReadMessages} from '../../Hooks/useGetNoReadMessages';
import {useFirebaseAuth} from '../../Context/FirebaseContext';

interface Props {
  position?: 'absolute' | 'relative';
}

export const HomeHeader: React.FC<Props> = ({position}) => {
  const {user} = useFirebaseAuth();

  const {noReadMessages} = useGetNoReadMessages();

  return (
    <View style={[t.mB10, t.pX4]}>
      <Header
        withPadding={false}
        position={position}
        leftSide={
          <View style={[t.flexRow]}>
            <Avatar
              imageStyle={[t.w12, t.h12]}
              style={[t.mR4]}
              img={user?.profileImg}
              onPress={() => openDrawer()}
            />
            <WelcomeMessage />
          </View>
        }
        leftStyles={[t.w48]}
      />
    </View>
  );
};
