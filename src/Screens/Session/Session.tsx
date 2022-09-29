import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import React from 'react';
import {useContext} from 'react';
import {Text, View} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {SessionSettings} from '../../Components/Session/SessionSettings';
import {Avatar} from '../../Components/UI/Avatar';
import {Chip} from '../../Components/UI/Chip';
import {HDivider} from '../../Components/UI/HDivider';
import {RadioButton} from '../../Components/UI/RadioButton';

import {VDivider} from '../../Components/UI/VDivider';
import {AuthContext} from '../../Context/AuthContex';
import {Roles} from '../../Global/types';
import {usePermissions} from '../../Hooks/usePermissions';
import t from '../../Theme/theme';
import {useGetSession} from './hooks/useGetSession';

export const SESSION_SCREEN_KEY = 'sessionScreen';

export const Session = ({route}) => {
  const sessionDay = format(new Date(), 'iii d MMMM yyyy', {locale: es});
  const {
    session,
    accounting,
    handleUpdatePaymentStatus,
    sessionAccountingBalance,
  } = useGetSession({
    sessionId: route?.params?.sessionId,
  });

  const {user} = useContext(AuthContext);

  return (
    <ScreenLayout>
      <Header
        title="Entreno de voleas"
        withBack
        // rightSide={
        //   (user?.role === Roles.COACH || Roles.ADMIN) && (
        //     <SessionSettings sessionId={session?.id} />
        //   )
        // }
      />
      <View style={[t.pX4]}>
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
              <Text>17:00h</Text>
            </View>
            <VDivider />
            <View style={[t.mL4]}>
              <Text style={[t.fontSansMedium, t.textBase, t.textGray700]}>
                Hora fin
              </Text>
              <Text>19:00h</Text>
            </View>
          </View>
        </View>
        <View style={[t.mT6]}>
          <Text style={[t.textGray500]}>Players</Text>
          <View style={[t.flexRow, t.justifyStart, t.mT4]}>
            {session?.players?.map(player => (
              <View style={[t.mR2]}>
                <Avatar img={player?.profileImg} />
                <Text style={[t.mT1, t.textXs, t.textGray700]}>
                  {player?.firstName} {player?.secondName}
                </Text>
              </View>
            ))}
          </View>
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
                {sessionAccountingBalance} {accounting?.[0]?.currency}
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
                <View style={[t.flexGrow, t.itemsEnd]}>
                  <RadioButton
                    active={accounting?.[0]?.players?.[player.id]}
                    onPress={() => handleUpdatePaymentStatus(player?.id)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenLayout>
  );
};
