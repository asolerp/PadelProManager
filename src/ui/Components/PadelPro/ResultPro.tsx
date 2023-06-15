import React from 'react';
import {Text, View} from 'react-native';
import {GameType, PlayerType} from '../../Global/types';
import t from '../../Theme/theme';
import {fullName, parseRound} from '../../Utils/parsers';
import {resultGame} from '../../Utils/resultGame';
import Icon from 'react-native-vector-icons/Ionicons';
interface Props {
  withService?: boolean;
  mode?: 'small' | 'normal';
  game: GameType;
  round: number;
  color: 'dark' | 'white';
  t1: PlayerType[];
  t2: PlayerType[];
}

export const ResultPro: React.FC<Props> = ({
  mode,
  withService = false,
  color = 'white',
  game,
  round,
  t1,
  t2,
}) => {
  const isSmall = mode === 'small';
  const textColor = color === 'dark' ? t.textGray800 : t.textWhite;

  return (
    <>
      <View style={[t.flexRow]}>
        <View style={[t.flexGrow]}>
          <Text style={[t.fontSans, t.textXs, textColor]}>
            {parseRound[round]?.toUpperCase()}
          </Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, textColor]}>
            SET1
          </Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, textColor]}>
            SET2
          </Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, textColor]}>
            SET3
          </Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, textColor]}>
            GAME
          </Text>
        </View>
      </View>
      <View
        style={[t.flexRow, t.borderT0_5, t.borderB0_5, t.borderWhite, t.mT1]}>
        <View style={[t.flexGrow, t.pY1]}>
          <Text style={[t.fontSansBold, textColor, isSmall && t.textXs]}>
            {fullName(1, t1?.[0].firstName, t1?.[0].secondName)}
          </Text>
          <Text style={[t.fontSansBold, textColor, isSmall && t.textXs]}>
            {fullName(2, t1?.[1].firstName, t1?.[1].secondName)}
          </Text>
        </View>
        {withService && game.service === 't1' && (
          <View style={[t.itemsCenter, t.justifyCenter]}>
            <Icon name="tennisball" color="white" />
          </View>
        )}
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {game?.s1t1}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {game?.s2t1}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {game?.s3t1}
          </Text>
        </View>
        <View style={[t.w12, t.bgInfoLight, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {resultGame(game)?.split('-')[0]}
          </Text>
        </View>
      </View>
      <View style={[t.flexRow, t.borderB0_5, t.borderWhite]}>
        <View style={[t.flexGrow, t.pY1]}>
          <Text style={[t.fontSansBold, textColor, isSmall && t.textXs]}>
            {fullName(3, t2?.[0].firstName, t2?.[0].secondName)}
          </Text>
          <Text style={[t.fontSansBold, textColor, isSmall && t.textXs]}>
            {fullName(4, t2?.[1].firstName, t2?.[1].secondName)}
          </Text>
        </View>
        {withService && game.service === 't2' && (
          <View style={[t.itemsCenter, t.justifyCenter]}>
            <Icon name="tennisball" color="white" />
          </View>
        )}
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {game?.s1t2}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {game?.s2t2}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {game?.s3t2}
          </Text>
        </View>
        <View style={[t.w12, t.bgInfoLight, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, textColor]}>
            {resultGame(game)?.split('-')[1]}
          </Text>
        </View>
      </View>
    </>
  );
};
