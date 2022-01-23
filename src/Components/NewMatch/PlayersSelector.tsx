import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AddPlayer} from './AddPlayer';
import t from '../../Theme/theme';
import {useNewMatchForm} from '../../Screens/NewMatch/hooks/useNewMatchForm';
import {ModalListOfPlayers} from './ModalListOfPlayers';
import {useState} from 'react';
import {NewMatchContext} from '../Context/NewMatchContext';

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
      <Text style={[t.fontSansBold, t.mB2]}>Seleccionar jugadores</Text>
      <View
        style={[
          {backgroundColor: FIELD_COLOR},
          {height: HEIGHT_FIELD + 5},
          t.shadow,
          borderSyles,
          t.border1,
          t.flexRow,
        ]}>
        <View style={[borderSyles, t.flex1]} />
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
        <View style={[borderSyles, t.flex1]} />
      </View>
    </>
  );
};
