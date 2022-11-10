import React from 'react';
import {FlatList, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Header, ScreenLayout} from '../../Components/Layout';
import {HDivider} from '../../Components/UI/HDivider';
import t from '../../Theme/theme';
import {municipios} from '../../Utils/municipios-espanoles';
import {provincias} from '../../Utils/provincias-espanolas';
import Icon from 'react-native-vector-icons/Ionicons';

import {useOpenSessions} from './hooks/useOpenSessions';

import {Chip} from '../../Components/UI/Chip';
import {format} from 'date-fns';
import {HOUR_FORMAT} from '../../Utils/date-ext';

export const OPEN_SESSIONS_SCREEN_KEY = 'openSessionsScreen';

export const getMunicipio = value => {
  const municipio = municipios.find(m => m.value === value);
  return municipio?.label;
};

export const getProvincia = value => {
  const provincia = provincias.find(m => m.value === value);
  return provincia?.label;
};

export const OpenSessions = () => {
  const {openSessions} = useOpenSessions();

  const renderItem = ({item}) => {
    return (
      <View style={[t.bgWhite, t.p3, t.shadow]}>
        <View style={[t.flexRow]}>
          <FastImage
            style={[t.w14, t.h14, t.roundedFull, t.z50]}
            source={{
              uri: item.coach.profileImg,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            s
          />
          <View style={[t.mL3]}>
            <Text style={[t.fontSansMedium, t.textXl]}>
              {item.coach.firstName} {item.coach.secondName}
            </Text>
            <Text style={[t.fontSansMedium, t.textXs, t.textGray600]}>
              {getProvincia(item?.provincia)}, {getMunicipio(item?.municipio)}
            </Text>
            <View style={[t.mT1, t.flexRow, t.itemsCenter]}>
              <Icon name="ios-map-outline" style={[t.mR1]} />
              <Text style={[t.fontSans, t.textSm]}>{item.club}</Text>
            </View>
          </View>
        </View>
        <HDivider style={[t.mY3]} />
        <View style={[t.flexRow, t.justifyBetween]}>
          <View style={[t.flex2]}>
            <Text style={[t.fontSansMedium]}>Información de la sesión</Text>
            <View style={[t.mT2]}>
              <Text style={[t.fontSans]}>{item.title}</Text>
              <Text
                style={[t.fontSans, t.mT1, t.textXs, t.textGray600]}
                numberOfLines={2}>
                {item.notes}
              </Text>
            </View>
            <View style={[t.flexRow, t.itemsCenter, t.mT2]}>
              <Chip
                style={[t.mR2]}
                mainColor="infoLight"
                text={`${format(item.startTime, HOUR_FORMAT)} - ${format(
                  item.endTime,
                  HOUR_FORMAT,
                )}`}
              />
            </View>
          </View>
          <View style={[t.flex1, t.itemsEnd]}>
            <View style={[t.flexRow, t.itemsCenter]}>
              <Icon name="ios-cash-outline" size={16} />
              <Text style={[t.fontSans, t.mL1]}>
                {item?.price} {item?.currency} total
              </Text>
            </View>
            <View style={[t.flexRow, t.itemsCenter, t.mT2]}>
              <Icon name="ios-person" size={16} />
              <Text style={[t.fontSans, t.mL1]}>0/4</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenLayout style={[t.bgWhite]}>
      <Header title="Sesiones" />
      <HDivider />
      <View style={[t.flex1, t.mT7, t.bgGray100]}>
        <FlatList
          data={openSessions}
          ItemSeparatorComponent={() => <View style={[t.mB3]} />}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </ScreenLayout>
  );
};
