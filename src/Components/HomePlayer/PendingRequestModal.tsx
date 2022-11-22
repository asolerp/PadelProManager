import React from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {NormalModal} from '../Modal/NormalModal';
import {Avatar} from '../UI/Avatar';
import {Button} from '../UI/Button';
import {HDivider} from '../UI/HDivider';

import {useAnswerRequest} from './hooks/useAnswerRequest';

const Coach = ({id, coach, onClose}) => {
  const {handleUpdateRequest, loading} = useAnswerRequest();
  return (
    <View style={[t.flex, t.justifyStart]}>
      <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
        <Avatar img={coach?.profileImg} />
        <View style={[t.mX2, t.flexShrink]}>
          <Text style={[t.fontSansBold, t.textLg]}>
            {coach?.firstName} {coach?.secondName}
          </Text>
        </View>
        <View style={[t.flexGrow, t.flexRow, t.justifyEnd]}>
          <Button
            title="Aceptar"
            type="inform"
            style={[t.mR1]}
            loading={loading}
            onPress={() => {
              handleUpdateRequest(id, 'accepted', onClose);
            }}
          />
          <Button
            title="Cancelar"
            type="error"
            loading={loading}
            onPress={() => {
              handleUpdateRequest(id, 'canceled', onClose);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const PendingRequestModal = ({
  coach,
  requestId,
  isVisible,
  setIsVisible,
}) => {
  return (
    <>
      <NormalModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <View>
          <Text style={[t.fontSansBold, t.textLg, t.mB3, t.textCenter]}>
            Notificación
          </Text>
          <Text
            style={[
              t.fontSans,
              t.textBase,
              t.textGray700,
              t.mB3,
              t.textCenter,
            ]}>
            Quiere que formes parte de su equipo de entrenamiento
          </Text>
          <HDivider />
          <View style={[t.mT4]}>
            <Coach
              id={requestId}
              coach={coach}
              onClose={() => setIsVisible(false)}
            />
          </View>
        </View>
      </NormalModal>
    </>
  );
};
