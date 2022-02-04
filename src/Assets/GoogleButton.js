import React from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../theme';
import {Colors} from '../../theme/Variables';

export const GoogleButton = ({onPress}) => {
  const {Layout, Gutters} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Gutters.smallVPadding,
          Gutters.smallHPadding,
          styles.container,
        ]}>
        <Image
          source={require('../../assets/img/google.png')}
          style={styles.googleLogo}
        />
        <View style={[Layout.fill, Layout.alignItemsCenter]}>
          <Text>Continuar con Google</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.grey,
    borderWidth: 0.5,
    borderRadius: 2,
  },
  googleLogo: {
    width: 15,
    height: 15,
  },
});
