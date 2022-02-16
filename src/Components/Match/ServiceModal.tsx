import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import t from '../../Theme/theme';
import {NormalModal} from '../Modal/NormalModal';
import {Button} from '../UI/Button';
import {useLiveMatch} from './hooks/useLiveMatch';

export const ServiceModal = ({match}) => {
  const {handleWhoStarts} = useLiveMatch(match);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!match?.game?.service) {
      setIsVisible(true);
    }
    return () => setIsVisible(false);
  }, [match]);

  return (
    <>
      <NormalModal isVisible={isVisible} onClose={() => {}}>
        <View style={[t.itemsCenter]}>
          <Text style={[t.fontSansBold, t.textLg, t.mB3]}>Servicio</Text>
          <Text style={[t.fontSans, t.textBase, t.textGray700, t.mB3]}>
            ¿Que pareja empieza sacando?
          </Text>
          <View style={[t.flexRow, t.mT3, t.justifyBetween]}>
            <Button
              active
              title="Pareja 1"
              style={[t.mR3]}
              onPress={() => handleWhoStarts('t1', () => setIsVisible(false))}
            />
            <Button
              active
              title="Pareja 2"
              type="success"
              onPress={() => handleWhoStarts('t2', () => setIsVisible(true))}
            />
          </View>
        </View>
      </NormalModal>
    </>
  );
};
