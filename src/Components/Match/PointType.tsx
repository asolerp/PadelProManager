import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';
import PressableOpacity from '../UI/PressableOpacity';

interface Props {
  children: string;
  mainColor: string;
  onPress?: () => void;
  active?: boolean;
}

export const PointType: React.FC<Props> = ({
  children,
  mainColor,
  onPress,
  active = false,
}) => {
  const capitalizedColor = capitalize(mainColor);

  const border = t?.[`border${capitalizedColor}Dark`];
  const bg = t?.[active ? `bg${capitalizedColor}` : 'bgWhite'];
  const textColor = active ? t.textWhite : t?.[`text${capitalizedColor}Dark`];

  return (
    <PressableOpacity
      onPress={onPress}
      style={[
        t.w20,
        t.h20,
        t.mB2,
        t.justifyCenter,
        t.itemsCenter,
        t.roundedSm,
        t.shadow,
        active ? t.border0 : t.border,
        border,
        bg,
      ]}>
      <Icon name="tennisball" size={25} style={[t.mB1, textColor]} />
      <Text
        style={[t.fontSansMedium, t.textXs, textColor, t.textCenter, t.maxW12]}>
        {children}
      </Text>
    </PressableOpacity>
  );
};
