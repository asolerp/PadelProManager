import {format} from 'date-fns';
import es from 'date-fns/esm/locale/es/index.js';
import React, {useContext} from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {AuthContext} from '../../Context/AuthContex';
import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';
import {useTranslation} from 'react-i18next';
interface WelcomeMessageProps {
  style?: ViewStyle[];
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({style}) => {
  const {user} = useContext(AuthContext);
  const {t: loc} = useTranslation();
  const date = format(Date.now(), 'EEEE dd MMMM', {
    locale: es,
  });

  return (
    <View style={[style]}>
      <Text style={[t.text2xl, t.mB1, t.fontSansBold]}>
        {loc('HELLO')} {user?.firstName}
      </Text>
      <Text style={[t.textBase, t.fontSans, t.textGray800]}>
        {capitalize(date.split(' ')[0]) +
          ' ' +
          date.split(' ')[1] +
          ' ' +
          capitalize(date.split(' ')[2])}
      </Text>
    </View>
  );
};
