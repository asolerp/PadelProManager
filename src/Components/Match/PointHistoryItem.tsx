import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {resultGame} from '../../Utils/gameLogic';
import {shortName} from '../../Utils/parsers';
import {Chip} from '../UI/Chip';
import {HDivider} from '../UI/HDivider';
import {
  mapPreposicion,
  mapResult,
  mapShotColorStyles,
  mapShotName,
} from './utils/maps';

export const PointHistoryItem = ({pointHistory}) => {
  return (
    <>
      <View style={[t.pY5]}>
        <Text style={[t.fontSansBold, t.mB1]}>
          {resultGame(pointHistory?.gameState)}
        </Text>
        {pointHistory?.points?.map((p, i) => {
          const {player, result, point} = p;
          return (
            <View key={i}>
              <View style={[t.flexRow, t.flexWrap, t.itemsCenter, t.mB2]}>
                {p?.info ? (
                  <Text style={[t.fontSans, t.mT2, t.textXs]}>{p?.info}</Text>
                ) : (
                  <>
                    <Text style={[t.fontSansBold, t.textWarningDark, t.textXs]}>
                      {shortName(player?.firstName, player?.secondName)}
                    </Text>
                    <Text style={[t.fontSans, t.textXs]}> ha </Text>
                    <Chip
                      type={result}
                      text={mapResult[result]}
                      styles={[t.mB2]}
                    />
                    <Text> {mapPreposicion?.[result]} </Text>
                    <Chip
                      styles={[mapShotColorStyles?.[point]]}
                      text={mapShotName[point]}
                    />
                  </>
                )}
              </View>
            </View>
          );
        })}
      </View>
      <HDivider />
    </>
  );
};
