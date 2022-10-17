import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {NormalModal} from '../Modal/NormalModal';
import {Avatar} from '../UI/Avatar';
import {Button} from '../UI/Button';
import {HDivider} from '../UI/HDivider';

const Coach = ({player, onAccept, onCancel}) => {
  return (
    <View style={[t.flex, t.justifyStart]}>
      <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
        <Avatar img={player?.profileImg} />
        <View style={[t.mX2, t.flexShrink]}>
          <Text style={[t.fontSansBold, t.textXs]}>
            {player?.firstName} {player?.secondName}
          </Text>
        </View>
        <View style={[t.flexGrow, t.flexRow, t.justifyEnd]}>
          <Button
            title="Aceptar"
            type="inform"
            style={[t.mR1]}
            onPress={onAccept}
          />
          <Button title="Cancelar" type="error" onPress={onCancel} />
        </View>
      </View>
    </View>
  );
};

export const PendingRelationModal = ({
  isVisible,
  setIsVisible,
  player,
  onAccept,
  onCancel,
}) => {
  return (
    <>
      <NormalModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <View>
          <Text style={[t.fontSansBold, t.textLg, t.mB3, t.textCenter]}>
            Petición de jugador
          </Text>
          <Text
            style={[
              t.fontSans,
              t.textBase,
              t.textGray700,
              t.mB3,
              t.textCenter,
            ]}>
            Quiere que seas su entrenador
          </Text>
          <HDivider style={[t.mB2]} />
          <Coach player={player} onAccept={onAccept} onCancel={onCancel} />
        </View>
      </NormalModal>
    </>
  );
};
