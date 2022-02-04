import {format} from 'date-fns';
import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import t from '../../Theme/theme';
import {rounds} from '../../Utils/lists';
import {HDivider} from '../UI/HDivider';
import {VDivider} from '../UI/VDivider';
import Animated, {LightSpeedInLeft} from 'react-native-reanimated';
import {es} from 'date-fns/locale';
import {capitalizeText} from '../../Utils/capitalizeText';

interface MatchInfoProps {
  club: string;
  date: number;
  category: string;
  tournamentName?: string;
  round?: string;
}

interface InfoElementProps {
  label: string;
  info?: string;
  align?: 'center' | 'left';
  children?: React.ReactNode;
  style?: ViewStyle[];
}

const InfoElement: React.FC<InfoElementProps> = ({
  label,
  info,
  align,
  children,
  style,
}) => {
  const position = align === 'center' ? t.itemsCenter : t.itemsStart;

  return (
    <View style={[style]}>
      <Text style={[t.fontSansBold, t.opacity30, t.textLg]}>{label}</Text>
      {children ? (
        <View style={[t.mT1, position]}>{children}</View>
      ) : (
        <Text style={[t.fontSansBold, t.textSm, t.mT2, position]}>{info}</Text>
      )}
    </View>
  );
};

export const MatchInfo: React.FC<MatchInfoProps> = ({
  club,
  date,
  round,
  category,
  tournamentName,
}) => {
  const matchDay = format(new Date(date), 'iii d MMMM yyyy', {locale: es});
  return (
    <Animated.View entering={LightSpeedInLeft}>
      <View style={[t.flexRow, t.justifyBetween, t.mY2]}>
        <InfoElement label="Club" info={club} />
        <VDivider />
        <InfoElement label="Fecha" info={capitalizeText(matchDay)} />
        <VDivider />
        <InfoElement label="Categoría" align="center">
          <View
            style={[
              t.roundedFull,
              t.bgInfo,
              t.justifyCenter,
              t.itemsCenter,
              t.p1,
            ]}>
            <Text style={[t.textWhite, t.fontSansBold, t.textSm]}>
              {category}
            </Text>
          </View>
        </InfoElement>
      </View>
      <HDivider />
      {!!tournamentName && !!round && (
        <View style={[t.flexRow, t.justifyBetween, t.mY2]}>
          <InfoElement
            label="Nombre del torneo"
            info={tournamentName}
            style={[t.flex3]}
          />
          <VDivider />
          <InfoElement
            label="Ronda"
            info={rounds.find(r => r.value === round).label}
            align="center"
            style={[t.flex2, t.mL3]}
          />
        </View>
      )}
    </Animated.View>
  );
};
