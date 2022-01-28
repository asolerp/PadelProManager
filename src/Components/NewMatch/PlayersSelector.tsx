import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AddPlayer} from './AddPlayer';
import t from '../../Theme/theme';
import {useNewMatchForm} from '../../Screens/NewMatch/hooks/useNewMatchForm';
import {ModalListOfPlayers} from './ModalListOfPlayers';
import {useState} from 'react';
import {NewMatchContext} from '../Context/NewMatchContext';
import {Chip} from '../UI/Chip';
import {
  categoryParse,
  colorByCategory,
  colorByHand,
  handParse,
} from '../../Utils/parsers';

const HEIGHT_FIELD = 250;
const FIELD_COLOR = '#0083B0';

export const PlayersSelector = () => {
  const borderSyles = [t.border, t.borderWhite];

  const [isVisible, setIsVisible] = useState(false);
  const {playerPosition, setPlayerPosition} = useNewMatchForm();
  const {selectedPlayers, setSelectedPlayers} = useContext(NewMatchContext);

  const handlePressAddPlayer = pos => {
    setPlayerPosition(pos);
    setIsVisible(true);
  };

  const handleSavePlayer = player => {
    setSelectedPlayers({...selectedPlayers, [playerPosition]: player});
  };

  return (
    <>
      <ModalListOfPlayers
        selectedPlayers={selectedPlayers}
        isVisible={isVisible}
        onSave={handleSavePlayer}
        onClose={() => setIsVisible(false)}
      />
      <Text style={[t.fontSansBold, t.textLg, t.mB2]}>
        Seleccionar jugadores
      </Text>
      <View
        style={[
          {backgroundColor: FIELD_COLOR},
          {height: HEIGHT_FIELD + 5},
          t.shadow,
          borderSyles,
          t.border1,
          t.flexRow,
        ]}>
        <View style={[borderSyles, t.flex1]}>
          <View
            style={[
              t.flex1,
              styles.rotateLeft,
              t.justifyCenter,
              t.itemsCenter,
            ]}>
            {selectedPlayers?.['1'] && (
              <>
                <Chip
                  text={categoryParse[selectedPlayers?.['1']?.category]}
                  mainColor={colorByCategory[selectedPlayers?.['1']?.category]}
                  style={[t.mB1]}
                />
                <Chip
                  text={handParse[selectedPlayers?.['1']?.hand]}
                  mainColor={colorByHand[selectedPlayers?.['1']?.hand]}
                />
              </>
            )}
          </View>
          <View
            style={[
              t.flex1,
              styles.rotateLeft,
              t.justifyCenter,
              t.itemsCenter,
            ]}>
            {selectedPlayers?.['2'] && (
              <>
                <Chip
                  text={categoryParse[selectedPlayers?.['2']?.category]}
                  mainColor={colorByCategory[selectedPlayers?.['2']?.category]}
                  style={[t.mB1]}
                />
                <Chip
                  text={handParse[selectedPlayers?.['2']?.hand]}
                  mainColor={colorByHand[selectedPlayers?.['2']?.hand]}
                />
              </>
            )}
          </View>
        </View>
        <View style={[t.flex2, {height: HEIGHT_FIELD}]}>
          <View
            style={[
              borderSyles,
              t.borderB1,
              t.borderL1,
              t.justifyCenter,
              t.itemsCenter,
              {height: HEIGHT_FIELD / 2},
            ]}>
            <AddPlayer
              imageSrc={selectedPlayers?.['1']?.profileImg}
              title={selectedPlayers?.['1']?.firstName || 'Jugador 1'}
              onPress={() => handlePressAddPlayer(1)}
            />
          </View>
          <View
            style={[
              borderSyles,
              t.borderB1,
              t.borderL1,
              t.justifyCenter,
              t.itemsCenter,
              {height: HEIGHT_FIELD / 2},
            ]}>
            <AddPlayer
              imageSrc={selectedPlayers?.['2']?.profileImg}
              title={selectedPlayers?.['2']?.firstName || 'Jugador 2'}
              onPress={() => handlePressAddPlayer(2)}
            />
          </View>
        </View>
        <View style={[t.flex2, {height: HEIGHT_FIELD}]}>
          <View
            style={[
              borderSyles,
              t.borderB1,
              t.borderR1,
              t.justifyCenter,
              t.itemsCenter,
              {height: HEIGHT_FIELD / 2},
            ]}>
            <AddPlayer
              imageSrc={selectedPlayers?.['3']?.profileImg}
              title={selectedPlayers?.['3']?.firstName || 'Jugador 3'}
              onPress={() => handlePressAddPlayer(3)}
            />
          </View>
          <View
            style={[
              borderSyles,
              t.borderB1,
              t.borderR1,
              t.justifyCenter,
              t.itemsCenter,
              {height: HEIGHT_FIELD / 2},
            ]}>
            <AddPlayer
              imageSrc={selectedPlayers?.['4']?.profileImg}
              title={selectedPlayers?.['4']?.firstName || 'Jugador 4'}
              onPress={() => handlePressAddPlayer(4)}
            />
          </View>
        </View>
        <View style={[borderSyles, t.flex1]}>
          <View
            style={[
              t.flex1,
              styles.rotateRight,
              t.justifyCenter,
              t.itemsCenter,
            ]}>
            {selectedPlayers?.['3'] && (
              <>
                <Chip
                  text={categoryParse[selectedPlayers?.['3']?.category]}
                  mainColor={colorByCategory[selectedPlayers?.['3']?.category]}
                  style={[t.mB1]}
                />
                <Chip
                  text={handParse[selectedPlayers?.['3']?.hand]}
                  mainColor={colorByHand[selectedPlayers?.['3']?.hand]}
                />
              </>
            )}
          </View>
          <View
            style={[
              t.flex1,
              styles.rotateRight,
              t.justifyCenter,
              t.itemsCenter,
            ]}>
            {selectedPlayers?.['4'] && (
              <>
                <Chip
                  text={categoryParse[selectedPlayers?.['4']?.category]}
                  mainColor={colorByCategory[selectedPlayers?.['4']?.category]}
                  style={[t.mB1]}
                />
                <Chip
                  text={handParse[selectedPlayers?.['4']?.hand]}
                  mainColor={colorByHand[selectedPlayers?.['4']?.hand]}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rotateLeft: {
    transform: [{rotate: '-90deg'}],
  },
  rotateRight: {
    transform: [{rotate: '90deg'}],
  },
});
