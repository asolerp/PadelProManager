import React, {useContext} from 'react';

import {View} from 'react-native';
import {AuthContext} from '../../Context/AuthContex';

import {openScreenWithPush} from '../../Router/utils/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import {PROFILE_SCREEN_KEY} from '../../Screens/Profile/Profile';
import t from '../../Theme/theme';
import {Header} from '../Layout';
import {Avatar} from '../UI/Avatar';
import {WelcomeMessage} from './WelcomeMessage';
import PressableOpacity from '../UI/PressableOpacity';
import {MESSAGES_SCREEN_KEY} from '../../Screens/Messages/Messages';
import {useGetNoReadMessages} from '../../Hooks/useGetNoReadMessages';

interface Props {
  position?: 'absolute' | 'relative';
}

export const HomeHeader: React.FC<Props> = ({position}) => {
  const {user} = useContext(AuthContext);
  const {noReadMessages} = useGetNoReadMessages();

  return (
    <View style={[t.mB10]}>
      <Header
        withPadding={false}
        position={position}
        leftSide={
          <View style={[t.flexRow]}>
            <Avatar
              imageStyle={[t.w12, t.h12]}
              style={[t.mR4]}
              img={user?.profileImg}
              onPress={() => openScreenWithPush(PROFILE_SCREEN_KEY)}
            />
            <WelcomeMessage />
          </View>
        }
        leftStyles={[t.w48]}
        rightSide={
          <View style={[t.relative]}>
            {noReadMessages && (
              <View
                style={[
                  t.absolute,
                  t.z50,
                  t.right0,
                  t.w3,
                  t.h3,
                  t.bgErrorDark,
                  t.roundedFull,
                ]}
              />
            )}
            <PressableOpacity
              onPress={() => openScreenWithPush(MESSAGES_SCREEN_KEY)}>
              <Icon name="chatbox-ellipses" size={25} />
            </PressableOpacity>
          </View>
        }
      />
    </View>
  );
};
