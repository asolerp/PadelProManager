import React from 'react';
import {Pressable, Text, View} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from '../UI/Avatar';

interface Props {
  onPress?: () => void;
  imageSrc?: string;
  title: string;
}

export const AddPlayer: React.FC<Props> = ({imageSrc, title, onPress}) => {
  return (
    <Pressable onPress={onPress} style={[t.justifyCenter, t.itemsCenter]}>
      {imageSrc ? (
        <Avatar
          onPress={onPress}
          img={imageSrc}
          style={[t.shadow, {borderWidth: 2}, t.borderWhite, t.roundedFull]}
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
    </Pressable>
  );
};
