import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import t from '../../Theme/theme';
import {colorParser} from '../../Utils/sessionParsers';

interface CalendarTypeProps {
  color: 'blue' | 'yellow' | 'red';
  active?: boolean;
  onPress: () => void;
}

export const CalendarType: React.FC<CalendarTypeProps> = ({
  color,
  active,
  onPress,
}) => {
  const activeStyle = {
    borderWidth: 1,
    borderRadius: 5,
  };

  return (
    <Pressable
      onPress={onPress}
      style={[t.p1, t.borderGray600, active && activeStyle]}>
      <View style={[t.w8, t.h5, colorParser[color], styles.container]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 2,
  },
});
