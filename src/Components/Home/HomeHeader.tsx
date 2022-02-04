import React, {useContext} from 'react';

import {Image} from 'react-native';
import {AuthContext} from '../../Context/AuthContex';
import {SubscriptionContext} from '../../Context/SubscriptionContext';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import {PROFILE_SCREEN_KEY} from '../../Screens/Profile/Profile';
import t from '../../Theme/theme';
import {Header} from '../Layout';
import {Avatar} from '../UI/Avatar';

export const HomeHeader = () => {
  const {user} = useContext(AuthContext);
  const {isUserWithActiveSubscription} = useContext(SubscriptionContext);
  return (
    <Header
      title={isUserWithActiveSubscription && 'PREMIUM'}
      leftSide={
        <Image
          resizeMode="contain"
          source={require('../../Assets/logo.png')}
          style={[t.h10, t.w8]}
        />
      }
      rightSide={
        <Avatar
          imageStyle={[t.w10, t.h10]}
          style={[t.mX2]}
          img={user?.profileImg}
          onPress={() => openScreenWithPush(PROFILE_SCREEN_KEY)}
        />
      }
    />
  );
};
