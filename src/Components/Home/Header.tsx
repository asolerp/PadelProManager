import React, {useContext} from 'react';

import {View, Image} from 'react-native';
import {AuthContext} from '../../Context/AuthContex';
import {openScreenWithPush} from '../../Router/utils/actions';
import {PLAYER_SCREEN_KEY} from '../../Screens/Player/Player';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';

export const Header = () => {
  const {user} = useContext(AuthContext);
  return (
    <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.mB10]}>
      <Image
        resizeMode="contain"
        source={require('../../Assets/logo.png')}
        style={[t.h10, t.w8]}
      />
      <Avatar
        imageStyle={[t.w10, t.h10]}
        style={[t.mX2]}
        img={user?.profileImg}
        onPress={() =>
          openScreenWithPush(PLAYER_SCREEN_KEY, {
            playerId: user?.id,
          })
        }
      />
    </View>
  );
};
