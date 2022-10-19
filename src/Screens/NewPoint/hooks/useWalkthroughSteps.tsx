import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {InteractionManager, Text} from 'react-native';
import {
  useWalkthrough,
  useWalkthroughStep,
} from 'react-native-interactive-walkthrough';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {Tooltip} from '../../../Components/Walkthrough/Tooltip';
import t from '../../../Theme/theme';

const WALKTHROUGH_TOTAL_STEPS = 4;

export const useWalkthroughSteps = () => {
  const {start, stop} = useWalkthrough();
  const {getItem, setItem} = useAsyncStorage('walkthrough');

  const {onLayout: stepOneOnLayout} = useWalkthroughStep({
    number: 1,
    OverlayComponent: props => (
      <Tooltip
        {...props}
        title={'Selecciona el tipo de punto'}
        buttonText={'Siguiente'}
        totalSteps={WALKTHROUGH_TOTAL_STEPS}
      />
    ),
    onPressBackdrop: () => {
      stop();
    },
  });

  const {onLayout: stepTwoOnLayout} = useWalkthroughStep({
    number: 2,
    OverlayComponent: props => (
      <Tooltip
        {...props}
        title={
          'Arrastra el tipo de golpe a uno de los jugadores con estadística'
        }
        subtitle={() => (
          <View style={[t.mB5]}>
            <Text style={[t.fontSansMedium, t.textWhite, t.mB2]}>Leyenda</Text>
            <Text style={[t.fontSans, t.textWhite]}>F - Fondo</Text>
            <Text style={[t.fontSans, t.textWhite]}>V - Volea</Text>
            <Text style={[t.fontSans, t.textWhite]}>B - Bajada</Text>
            <Text style={[t.fontSans, t.textWhite]}>BJ - Bandeja</Text>
            <Text style={[t.fontSans, t.textWhite]}>SM - Smatch</Text>
            <Text style={[t.fontSans, t.textWhite]}>GL - Globo</Text>
            <Text style={[t.fontSans, t.textWhite]}>D - Derecha</Text>
            <Text style={[t.fontSans, t.textWhite]}>R - Revés</Text>
          </View>
        )}
        buttonText={'Siguiente'}
        totalSteps={WALKTHROUGH_TOTAL_STEPS}
      />
    ),
    onPressBackdrop: () => {
      stop();
    },
  });

  const {onLayout: stepThirdOnLayout} = useWalkthroughStep({
    number: 3,
    OverlayComponent: props => (
      <Tooltip
        {...props}
        title={'Selecciona una pareja para añadir un punto sin estadística'}
        buttonText={'Siguiente'}
        totalSteps={WALKTHROUGH_TOTAL_STEPS}
      />
    ),
    onPressBackdrop: () => {
      stop();
    },
  });

  const {onLayout: stepFourthOnLayout} = useWalkthroughStep({
    number: 4,
    OverlayComponent: props => (
      <Tooltip
        {...props}
        title={'Guarda el punto'}
        buttonText={'Finalizar'}
        onFinish={async () => await setItem('finish')}
        totalSteps={WALKTHROUGH_TOTAL_STEPS}
        isTop={false}
      />
    ),
    onPressBackdrop: () => {
      stop();
    },
  });

  const readWalkThroughFromStorage = async () => {
    const hasUserWalkThrough = !!(await getItem());
    if (!hasUserWalkThrough) {
      start();
    }
  };

  useEffect(() => {
    readWalkThroughFromStorage();
  }, []);

  return {
    start,
    stepOneOnLayout,
    stepTwoOnLayout,
    stepThirdOnLayout,
    stepFourthOnLayout,
  };
};
