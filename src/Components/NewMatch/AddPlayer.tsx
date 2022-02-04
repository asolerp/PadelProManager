import React from 'react';
import {Text, View} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from '../UI/Avatar';
import PressableOpacity from '../UI/PressableOpacity';

interface Props {
  onPress?: () => void;
  imageSrc?: string;
  title: string;
}

export const AddPlayer: React.FC<Props> = ({imageSrc, title, onPress}) => {
  return (
    <PressableOpacity
      onPress={onPress}
      style={[t.justifyCenter, t.itemsCenter]}>
      {imageSrc ? (
        <Avatar
          onPress={onPress}
          img={imageSrc}
          imageStyle={[t.w16, t.h16]}
          style={[
            t.shadow,
            {borderWidth: 2},
            t.borderWhite,
            t.roundedFull,
            t.mB1,
          ]}
        />
      ) : (
        <View
          style={[
            t.bgWhite,
            t.justifyCenter,
            t.roundedFull,
            t.itemsCenter,
            t.shadow,
            t.w10,
            t.h10,
            t.mB1,
          ]}>
          <Icon name="add" color="#0083B0" size={22} />
        </View>
      )}
      <Text style={[t.fontSansBold, t.textWhite]}>{title}</Text>
    </PressableOpacity>
  );
};
