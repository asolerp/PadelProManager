import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';
import {Button} from '../../Components/UI/Button';

import {useGetProducts} from './hooks/useGetProducts';
import {usePayProduct} from './hooks/usePayProduct';

import {Header} from '../../Components/Layout';

export const PROMOTIONAL_SUBSCRIPTION_SCREEN_KEY = 'promotionalSubscription';

const Service = ({iconName, title}) => {
  return (
    <View style={[t.flexCol, t.justifyCenter, t.itemsCenter, t.w44, t.mB5]}>
      <Icon name={iconName} color="white" size={80} />
      <Text
        style={[
          t.fontSansMedium,
          t.textBase,
          t.textGray500,
          t.textCenter,
          t.w24,
        ]}>
        {title}
      </Text>
    </View>
  );
};

export const PromotionalSubscription = () => {
  const {packages, loading} = useGetProducts();
  const {handleMakePayment} = usePayProduct();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg backgroundColor="Gray900" opacity={80}>
        <Header withBack mode="dark" containerStyle={[t.absolute, t.top14]} />
        <ScrollView showsVerticalScrollIndicator={false} style={[t.flex1]}>
          <View style={[t.flexGrow, t.itemsCenter, t.justifyCenter]}>
            <View style={[t.wFull, t.pY5]}>
              <View style={[t.flexRow, t.justifyBetween, t.mT5]}>
                <Service
                  iconName="people-circle-sharp"
                  title="Creación de grupos"
                />
                <Service iconName="tennisball" title="Análisis de partidos" />
              </View>
              <View style={[t.flexRow, t.justifyBetween, t.mT5]}>
                <Service
                  iconName="ios-easel-sharp"
                  title="Acceso a ejercicios"
                />
                <Service iconName="ios-calendar" title="Gestión de agenda" />
              </View>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View style={[t.mY5]}>
                  <Text
                    style={[
                      t.fontSansBold,
                      t.textLg,
                      t.textWhite,
                      t.mB5,
                      t.textCenter,
                    ]}>
                    ¡Primer mes gratis!
                  </Text>
                  <Text
                    style={[
                      t.fontSansBold,
                      t.text2xl,
                      t.textWhite,
                      t.mB5,
                      t.textCenter,
                    ]}>
                    Tan solo por {packages?.[0]?.product?.price_string} al mes
                  </Text>

                  <Button
                    active
                    title="Empezar prueba"
                    type="white"
                    textStyle={[t.textLg]}
                    style={[t.pY4]}
                    onPress={() => handleMakePayment(packages?.[0])}
                  />
                </View>
              )}
              <View>
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
                    style={[
                      t.fontSans,
                      t.textBase,
                      t.textGray500,
                      t.textCenter,
                    ]}>
                    Tu cuenta de Itunes te cobrará al final del período de
                    prueba o cuando confirmes la subscripción al servicio
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
                    style={[
                      t.fontSans,
                      t.textBase,
                      t.textGray500,
                      t.textCenter,
                    ]}>
                    Sí, puedes cancelar tu subscripción en cualquier momento con
                    un solo click en la App Store
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ContainerWithBg>
    </>
  );
};
