import React from 'react';
import {View} from 'react-native';
import t from '../../Theme/theme';

export const Steps = ({
  currentStep,
  totalSteps,
  dotsSpacing,
  color = t.bgWarningDark.backgroundColor,
  disabledColor = t.bgGray900.backgroundColor,
}) => {
  return (
    <View style={[t.flexRow]}>
      {[...Array(totalSteps)].map((_, index) => {
        const filled = index + 1 === currentStep;
        const dotColor = disabledColor && !filled ? disabledColor : color;

        return (
          <View
            style={[
              t.w3,
              t.h3,
              t.mR1,
              t.roundedFull,
              {backgroundColor: dotColor, opacity: filled ? 1 : 0.8},
            ]}
            key={index}
            filled={filled}
            dotsSpacing={dotsSpacing}
            color={dotColor}
            disabled={!filled && !disabledColor}
          />
        );
      })}
    </View>
  );
};

// const ContainerView = styled.View`
//   flex-direction: row;
//   padding-vertical: 8px;
// `;

// const StepIcon = styled.View`
//   background-color: ${({color}) => color};
//   width: 8px;
//   height: 8px;
//   border-radius: 4px;
//   opacity: ${({disabled}) => (disabled ? '0.5' : '1')};
//   margin-right: ${({dotsSpacing}) => dotsSpacing || '8px'};
// `;
