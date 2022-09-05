import React, {useContext} from 'react';

import {View} from 'react-native';
import {AuthContext} from '../../Context/AuthContex';

import {openScreenWithPush} from '../../Router/utils/actions';

import {PROFILE_SCREEN_KEY} from '../../Screens/Profile/Profile';
import t from '../../Theme/theme';
import {Header} from '../Layout';
import {Avatar} from '../UI/Avatar';
import {WelcomeMessage} from './WelcomeMessage';

interface Props {
  position?: 'absolute' | 'relative';
}

export const HomeHeader: React.FC<Props> = ({position}) => {
  const {user} = useContext(AuthContext);

  return (
    <View style={[t.mB10]}>
      <Header
        withPadding={false}
        position={position}
        leftSide={<WelcomeMessage />}
        leftStyles={[t.w48]}
        rightSide={
          <Avatar
            imageStyle={[t.w12, t.h12]}
            style={[t.mX2]}
            img={user?.profileImg}
            onPress={() => openScreenWithPush(PROFILE_SCREEN_KEY)}
          />
        }
      />
    </View>
  );
};
