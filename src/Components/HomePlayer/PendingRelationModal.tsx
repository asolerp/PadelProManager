import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {NormalModal} from '../Modal/NormalModal';
import {Avatar} from '../UI/Avatar';
import {Button} from '../UI/Button';
import {HDivider} from '../UI/HDivider';
import {useAnswerRelation} from './hooks/useAnswerRelation';

const Coach = ({id, coach, onClose}) => {
  const {handleUpdatePetiton} = useAnswerRelation();
  return (
    <View style={[t.flex, t.justifyStart]}>
      <View style={[t.flexRow, t.justifyStart, t.itemsCenter]}>
        <Avatar img={coach?.profileImg} />
        <View style={[t.mX2, t.flexShrink]}>
          <Text style={[t.fontSansBold, t.textXs]}>
            {coach?.firstName} {coach?.secondName}
          </Text>
        </View>
        <View style={[t.flexGrow, t.flexRow, t.justifyEnd]}>
          <Button
            title="Aceptar"
            type="inform"
            style={[t.mR1]}
            onPress={() => {
              handleUpdatePetiton(id, 'accepted');
              onClose();
            }}
          />
          <Button
            title="Cancelar"
            type="error"
            onPress={() => {
              handleUpdatePetiton(id, 'canceled');
              onClose();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const PendingRelationModal = ({relations}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (relations?.length > 0) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, [relations]);

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
            Quiere ser tu entrenador
          </Text>
          <HDivider />
          <View style={[t.mT4]}>
            {relations?.map(rel => (
              <Coach
                key={rel?.id}
                id={rel?.id}
                coach={rel?.coach}
                onClose={() => setIsVisible(false)}
              />
            ))}
          </View>
        </View>
      </NormalModal>
    </>
  );
};
