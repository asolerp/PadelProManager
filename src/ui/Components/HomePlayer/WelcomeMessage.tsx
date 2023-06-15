import {format} from 'date-fns';
import es from 'date-fns/esm/locale/es/index.js';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {useFirebaseAuth} from '../../Context/FirebaseContext';

import t from '../../Theme/theme';
import {capitalize} from '../../Utils/parsers';

export const WelcomeMessage = ({style}) => {
  const {user} = useFirebaseAuth();

  const date = format(Date.now(), 'EEEE dd MMMM', {
    locale: es,
  });

  return (
    <View style={[style]}>
      <Text style={[t.text2xl, t.mB1, t.fontSansBold]}>
        Hola {user?.firstName}
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
