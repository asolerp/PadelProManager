import {format} from 'date-fns';
import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {VDivider} from '../UI/VDivider';

interface MatchInfoProps {
  club: string;
  date: number;
  category: string;
}

interface InfoElementProps {
  label: string;
  info?: string;
  align?: 'center' | 'left';
  children?: React.ReactNode;
}

const InfoElement: React.FC<InfoElementProps> = ({
  label,
  info,
  align,
  children,
}) => {
  const position = align === 'center' ? t.itemsCenter : t.itemsStart;

  return (
    <View>
      <Text style={[t.fontSansBold, t.opacity30, t.textLg]}>{label}</Text>
      {children ? (
        <View style={[t.mT1, position]}>{children}</View>
      ) : (
        <Text style={[t.fontSansBold, t.textSm, t.mT2, position]}>{info}</Text>
      )}
    </View>
  );
};

export const MatchInfo: React.FC<MatchInfoProps> = ({club, date, category}) => {
  const matchDay = format(new Date(date), 'iii d MMMM yyyy');
  return (
    <View style={[t.flexRow, t.justifyBetween, t.mY2]}>
      <InfoElement label="Club" info={club} />
      <VDivider />
      <InfoElement label="Fecha" info={matchDay} />
      <VDivider />
      <InfoElement label="Categoría" align="center">
        <View
          style={[
            t.w7,
            t.h7,
            t.roundedFull,
            t.bgInfo,
            t.justifyCenter,
            t.itemsCenter,
          ]}>
          <Text style={[t.textWhite, t.fontSansBold]}>{category + 'ª'}</Text>
        </View>
      </InfoElement>
    </View>
  );
};
