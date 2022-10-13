import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import React from 'react';
import {useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {SessionSettings} from '../../Components/Session/SessionSettings';
import {Avatar} from '../../Components/UI/Avatar';
import {Chip} from '../../Components/UI/Chip';
import {HDivider} from '../../Components/UI/HDivider';
import {RadioButton} from '../../Components/UI/RadioButton';

import {VDivider} from '../../Components/UI/VDivider';
import {AuthContext} from '../../Context/AuthContex';

import t from '../../Theme/theme';
import {useGetSession} from './hooks/useGetSession';

export const SESSION_SCREEN_KEY = 'sessionScreen';

export const Session = ({route}) => {
  const {
    session,
    accounting,
    handleUpdatePaymentStatus,
    sessionAccountingBalance,
  } = useGetSession({
    sessionId: route?.params?.sessionId,
  });

  const sessionDay =
    session &&
    format(new Date(session?.date), 'iii d MMMM yyyy', {
      locale: es,
    });
  const startHour =
    session &&
    format(new Date(session?.startTime), 'HH:mm', {
      locale: es,
    });
  const endHour =
    session &&
    format(new Date(session?.endTime), 'HH:mm', {
      locale: es,
    });

  const {isCoach} = useContext(AuthContext);

  return (
    <ScreenLayout>
      <Header
        title="Entreno de voleas"
        withBack
        rightSide={isCoach && <SessionSettings session={session} />}
      />
      <ScrollView
        contentInset={{bottom: 20}}
        showsVerticalScrollIndicator={false}
        style={[t.pX4, t.flex1]}>
        <View style={[t.mT8]}>
          <Text style={[t.textGray500]}>General information</Text>
          <View style={[t.mT4, t.flexRow, t.mB2]}>
            <View style={[t.mR4]}>
              <Text style={[t.fontSansMedium, t.textBase, t.textGray700]}>
                Club
              </Text>
              <Text>Palma Raquet</Text>
            </View>
            <VDivider />
            <View style={[t.mL4]}>
              <Text style={[t.fontSansMedium, t.textBase, t.textGray700]}>
                Fecha entreno
              </Text>
              <Text>{sessionDay}</Text>
            </View>
          </View>
          <HDivider />
          <View style={[t.mT2, t.flexRow, t.mB2]}>
            <View style={[t.mR4]}>
              <Text style={[t.fontSansMedium, t.textBase, t.textGray700]}>
                Hora inicio
              </Text>
              <Text>{startHour}h</Text>
            </View>
            <VDivider />
            <View style={[t.mL4]}>
              <Text style={[t.fontSansMedium, t.textBase, t.textGray700]}>
                Hora fin
              </Text>
              <Text>{endHour}</Text>
            </View>
          </View>
        </View>
        <View style={[t.mT6]}>
          <Text style={[t.textGray500]}>Players</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={[t.flexRow, t.mT4]}
            contentContainerStyle={[t.justifyStart]}>
            {session?.players?.map(player => (
              <View style={[t.mR2, t.justifyCenter, t.itemsCenter]}>
                <Avatar img={player?.profileImg} />
                <Text style={[t.mT1, t.textXs, t.textGray700]}>
                  {player?.firstName?.[0]}
                  {'.'}
                  {player?.secondName?.split(' ')[0]}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={[t.mT6]}>
          <Text style={[t.textGray500]}>Notas para los jugadores</Text>
          <Text style={[t.mT4]}>{session?.notes}</Text>
        </View>
        <View style={[t.mT6]}>
          <Text style={[t.textGray500, t.mB4]}>Contabilidad</Text>
          <View style={[t.flexRow, t.itemsCenter, t.mB4]}>
            <View style={[t.mR4]}>
              <Text style={[t.fontSansMedium, t.textBase, t.textGray700]}>
                Precio sesión
              </Text>
              <Text style={[t.fontSansBold]}>
                {accounting?.[0]?.price} {accounting?.[0]?.currency}
              </Text>
            </View>
            <VDivider />
            <View style={[t.mL4]}>
              <Text style={[t.fontSansMedium, t.textBase, t.textGray700]}>
                Total pagado
              </Text>
              <Text
                style={[
                  t.fontSansBold,
                  sessionAccountingBalance === 0
                    ? t.textErrorDark
                    : sessionAccountingBalance < accounting?.[0]?.price
                    ? t.textErrorDark
                    : t.textSuccessDark,
                ]}>
                {Math.round(sessionAccountingBalance)}{' '}
                {accounting?.[0]?.currency}
              </Text>
            </View>
          </View>
          <HDivider style={[t.mB4]} />
          {session?.players?.map(player => (
            <View
              style={[
                t.flexRow,
                t.p2,
                t.borderGray300,
                t.roundedSm,
                t.justifyStart,
                t.bgWhite,
                t.mB2,
                // t.shadow,
                {borderWidth: 0.5},
              ]}>
              <View style={[t.flexRow, t.itemsCenter, t.wFull]}>
                <Avatar img={player?.profileImg} imageStyle={[t.w8, t.h8]} />
                <Text style={[t.mL2, t.textBase, t.textGray700]}>
                  {player?.firstName} {player?.secondName}
                </Text>
                <View style={[t.flexGrow, t.itemsCenter]}>
                  {accounting?.[0]?.players?.[player.id] ? (
                    <Chip text="Pagado" mainColor="success" />
                  ) : (
                    <Chip text="Por pagar" mainColor="error" />
                  )}
                </View>
                {isCoach && (
                  <View style={[t.flexGrow, t.itemsEnd]}>
                    <RadioButton
                      active={accounting?.[0]?.players?.[player.id]}
                      onPress={() =>
                        isCoach && handleUpdatePaymentStatus(player?.id)
                      }
                    />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
