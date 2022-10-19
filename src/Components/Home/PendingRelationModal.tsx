import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import t from '../../Theme/theme';
import {NormalModal} from '../Modal/NormalModal';
import {Avatar} from '../UI/Avatar';
import {Button} from '../UI/Button';
import {HDivider} from '../UI/HDivider';
import PressableOpacity from '../UI/PressableOpacity';
import Icon from 'react-native-vector-icons/Ionicons';

const Coach = ({player, loading, onAccept, onCancel}) => {
  return (
    <View style={[t.flex, t.justifyStart]}>
      <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
        <Avatar img={player?.profileImg} />
        <View style={[t.mX2, t.flexShrink]}>
          <Text style={[t.fontSansBold, t.textXs]}>
            {player?.firstName} {player?.secondName}
          </Text>
        </View>
        <View style={[t.flexGrow, t.itemsCenter, t.flexRow, t.justifyEnd]}>
          {loading ? (
            <View style={[t.mR5]}>
              <ActivityIndicator />
            </View>
          ) : (
            <Button
              title="Aceptar"
              type="inform"
              style={[t.mR1]}
              onPress={onAccept}
            />
          )}
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
  loading,
  onAccept,
  onCancel,
}) => {
  return (
    <>
      <NormalModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <View>
          <View style={[t.flexRow, t.itemsCenter, t.mB5]}>
            <Text style={[t.fontSansBold, t.flexGrow, t.textLg, t.textCenter]}>
              PETICION DE JUGADOR
            </Text>
            <PressableOpacity
              style={t.selfEnd}
              onPress={() => setIsVisible(false)}>
              <Icon name="close" size={25} />
            </PressableOpacity>
          </View>
          <Text
            style={[
              t.fontSans,
              t.textBase,
              t.textGray700,
              t.mB5,
              t.textCenter,
            ]}>
            Quiere que seas su entrenador
          </Text>
          <HDivider style={[t.mB2]} />
          <Coach
            player={player}
            loading={loading}
            onAccept={onAccept}
            onCancel={onCancel}
          />
        </View>
      </NormalModal>
    </>
  );
};
