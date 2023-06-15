import React, {useContext} from 'react';

import {View} from 'react-native';

import t from '../../Theme/theme';
import {Header} from '../Layout';

import {openScreenWithPush} from '../../Router/utils/actions';

import {Avatar} from '../UI/Avatar';
import {WelcomeMessage} from './WelcomeMessage';
import {PROFILE_SCREEN_KEY} from '../../Screens/Profile/Profile';
import {useFirebaseAuth} from '../../Context/FirebaseContext';

export const PlayerHeader = ({position}) => {
  const {user} = useFirebaseAuth();

  return (
    <View style={[t.mB10]}>
      <Header
        position={position}
        leftStyles={[t.w48]}
        leftSide={<WelcomeMessage />}
        rightSide={
          <Avatar
            imageStyle={[t.w12, t.h12]}
            style={[t.mX2]}
            img={user?.profileImg}
            onPress={() =>
              openScreenWithPush(PROFILE_SCREEN_KEY, {
                edit: true,
              })
            }
          />
        }
      />
    </View>
  );
};
