import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';
import {Header} from '../../Components/Layout';
import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';
import {Button} from '../../Components/UI/Button';
import {useIAP, requestSubscription} from 'react-native-iap';
import {openScreenWithPush, popScreen} from '../../Router/utils/actions';
import {HOME_SCREEN_KEY} from '../Home/Home';

export const PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY = 'promotionalSubscription';

const Service = ({iconName, title}) => {
  return (
    <View style={[t.flexCol, t.justifyCenter, t.itemsCenter, t.w20]}>
      <Icon name={iconName} color="white" size={80} />
      <Text style={[t.fontSansMedium, t.textBase, t.textGray500, t.textCenter]}>
        {title}
      </Text>
    </View>
  );
};

export const PromotionalSubscription = () => {
  const {subscriptions} = useIAP();

  const handleSubscription = async () => {
    try {
      await requestSubscription(subscriptions[0].productId);
      popScreen();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ContainerWithBg backgroundColor="Gray900" opacity={80}>
      <>
        <Header withBack mode="black" title="PREMIUM" />
        <View style={[t.flexGrow, t.itemsCenter, t.justifyCenter]}>
          <View style={[t.wFull, t.pY5]}>
            <Text
              style={[
                t.fontSansBold,
                t.text2xl,
                t.textWhite,
                t.mB10,
                t.textCenter,
              ]}>
              ¡Actualiza tu cuenta!
            </Text>
            <View style={[t.flexRow, t.justifyBetween]}>
              <Service
                iconName="people-circle-sharp"
                title="Jugadores ilimitados"
              />
              <Service iconName="tennisball" title="Partidas ilimitadas" />
              <Service iconName="ios-easel-sharp" title="Acceso a ejercicios" />
            </View>
            <View style={[t.mY10]}>
              <Text
                style={[
                  t.fontSansBold,
                  t.text2xl,
                  t.textWhite,
                  t.mB5,
                  t.textCenter,
                ]}>
                Tan solo por 4,99€ al mes
              </Text>
              <Button
                title="Acerse premium ahora"
                type="white"
                textStyle={[t.textLg]}
                style={[t.pY4]}
                onPress={() => handleSubscription()}
              />
              <View style={[t.justifyCenter, t.itemsCenter, t.mT5]}>
                <Text
                  style={[
                    t.fontSansBold,
                    t.textXl,
                    t.textWhite,
                    t.textCenter,
                    t.mB2,
                  ]}>
                  ¿Cuando se me cobrará?
                </Text>
                <Text
                  style={[t.fontSans, t.textBase, t.textGray500, t.textCenter]}>
                  Tu cuenta de Itunes te cobrará al final del período de prueba
                  o cuando confirmes la subscripción al servicio
                </Text>
                <Text
                  style={[
                    t.fontSansBold,
                    t.textXl,
                    t.textWhite,
                    t.textCenter,
                    t.mT5,
                    t.mB2,
                  ]}>
                  ¿Se renueva automáticamente mi subscripción?
                </Text>
                <Text
                  style={[t.fontSans, t.textBase, t.textGray500, t.textCenter]}>
                  Sí, puedes cancelar tu subscripción en cualquier momento con
                  un solo click en la App Store
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    </ContainerWithBg>
  );
};
