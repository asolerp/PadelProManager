import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Button} from '../UI/Button';
import {PremiumModalContext} from '../../Context/PremiumModalContext';
import t from '../../Theme/theme';
import {GENERAL_LIMIT, LIMIT_PLAYERS} from '../../Utils/permissionsErrors';
import {NormalModal} from '../Modal/NormalModal';

import {openScreenWithPush} from '../../Router/utils/actions';
import {PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY} from '../../Screens/PromotionalSubscription/PromotionalSubscription';

interface Props {
  isVisible: boolean;
}

export const PremiumModal: React.FC<Props> = ({isVisible}) => {
  const {setIsVisible, messageType} = useContext(PremiumModalContext);

  const messages = {
    [LIMIT_PLAYERS]:
      'Has alcanzado el máximo de jugadores que puedes crear. Hazte premium para tener acceso ilimitado',
    [GENERAL_LIMIT]: 'Hazte premium para poder disfrutar de esta funcionalidad',
  };

  return (
    <NormalModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
      <View style={[]}>
        <Text style={[t.fontSansBold, t.text2xl, t.textCenter, t.mB5]}>
          ¡Contenido premium!
        </Text>
        <Text style={[t.fontSans, t.textLg, t.mB10]}>
          {messages[messageType]}
        </Text>
        <Button
          title="Hacerse premium"
          size="lg"
          active
          onPress={() => {
            setIsVisible(false);
            openScreenWithPush(PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY);
          }}
        />
      </View>
    </NormalModal>
  );
};
