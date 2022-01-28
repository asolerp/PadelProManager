import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import t from '../../Theme/theme';
import {timeout} from '../../Utils/timeout';
import {NormalModal} from '../Modal/NormalModal';
import {Button} from '../UI/Button';

export const FinishedMatchModal = ({isVisible, onAccept}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setVisible(isVisible);
    }
  }, [isVisible]);

  return (
    <NormalModal isVisible={visible} onClose={() => setVisible(false)}>
      <View style={[t.itemsCenter]}>
        <Text style={[t.fontSansBold, t.textLg, t.textCenter, t.mB3]}>
          Finalizar partido
        </Text>
        <Text
          style={[t.fontSans, t.textBase, t.textGray700, t.textCenter, t.mB3]}>
          El partido ha finalizado, dale a aceptar para que las estadísticas de
          este partido se sumen a los globales de cada jugador.
        </Text>
        <View style={[t.flexRow, t.mT3, t.justifyBetween]}>
          <Button
            active
            title="Si"
            style={[t.mR3, t.w12]}
            onPress={async () => {
              setVisible(false);
              await timeout(400);
              await onAccept();
            }}
          />
          <Button
            active
            title="No"
            type="error"
            style={[t.w12]}
            onPress={() => setVisible(false)}
          />
        </View>
      </View>
    </NormalModal>
  );
};
