import React from 'react';
import {Text, View} from 'react-native';
import {GameType, PlayerType} from '../../Global/types';
import t from '../../Theme/theme';
import {fullName} from '../../Utils/parsers';
import {resultGame} from '../../Utils/resultGame';

interface Props {
  mode?: 'small' | 'normal';
  game: GameType;
  t1: PlayerType[];
  t2: PlayerType[];
}

export const ResultPro: React.FC<Props> = ({mode, game, t1, t2}) => {
  const isSmall = mode === 'small';

  return (
    <>
      <View style={[t.flexRow]}>
        <View style={[t.flexGrow]}>
          <Text style={[t.fontSans, t.textXs, t.textWhite]}>SEMIFINAL</Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, t.textWhite]}>
            SET1
          </Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, t.textWhite]}>
            SET2
          </Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, t.textWhite]}>
            SET3
          </Text>
        </View>
        <View style={[t.w12]}>
          <Text style={[t.fontSans, t.textCenter, t.textXs, t.textWhite]}>
            GAME
          </Text>
        </View>
      </View>
      <View
        style={[t.flexRow, t.borderT0_5, t.borderB0_5, t.borderWhite, t.mT1]}>
        <View style={[t.flexGrow, t.pY1]}>
          <Text style={[t.fontSansBold, t.textWhite, isSmall && t.textXs]}>
            {fullName(1, t1?.[0].firstName, t1?.[0].secondName)}
          </Text>
          <Text style={[t.fontSansBold, t.textWhite, isSmall && t.textXs]}>
            {fullName(2, t1?.[1].firstName, t1?.[1].secondName)}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {game.s1t1}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {game.s2t1}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {game.s3t1}
          </Text>
        </View>
        <View style={[t.w12, t.bgInfoLight, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {resultGame(game)?.split('-')[0]}
          </Text>
        </View>
      </View>
      <View style={[t.flexRow, t.borderB0_5, t.borderWhite]}>
        <View style={[t.flexGrow, t.pY1]}>
          <Text style={[t.fontSansBold, t.textWhite, isSmall && t.textXs]}>
            {fullName(3, t2?.[0].firstName, t2?.[0].secondName)}
          </Text>
          <Text style={[t.fontSansBold, t.textWhite, isSmall && t.textXs]}>
            {fullName(4, t2?.[1].firstName, t2?.[1].secondName)}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {game.s1t2}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {game.s2t2}
          </Text>
        </View>
        <View style={[t.w12, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {game.s3t2}
          </Text>
        </View>
        <View style={[t.w12, t.bgInfoLight, t.itemsCenter, t.justifyCenter]}>
          <Text style={[t.text3xl, t.fontSansBold, t.textWhite]}>
            {resultGame(game)?.split('-')[1]}
          </Text>
        </View>
      </View>
    </>
  );
};
