import React from 'react';
import {Text, View} from 'react-native';
import t from '../../Theme/theme';

import {Steps} from '../Common/Steps';
import {Button} from '../UI/Button';
import PressableOpacity from '../UI/PressableOpacity';

export const Tooltip = ({
  next,
  onFinish,
  step: {
    mask: {y = 0, height = 0},
    number,
  },
  title,
  subtitle,
  buttonText,
  totalSteps,
  isTop = true,
}) => {
  const onNext = () => {
    next();
    onFinish && onFinish();
  };

  return (
    <View
      style={[
        t.absolute,
        t.p5,
        t.roundedSm,
        t.border0_5,
        t.borderInfoLight,
        t.bgInfoDark,
        {top: isTop ? y + height + 20 : y - height - 90, left: 10},
      ]}>
      <Text style={[t.fontSansMedium, t.textLg, t.textWhite, t.mB5]}>
        {title}
      </Text>
      {subtitle && subtitle()}
      <View style={[t.flexRow, t.itemsCenter]}>
        <Steps currentStep={number} totalSteps={totalSteps} />
        <PressableOpacity style={[t.mL2]} onPress={onNext}>
          <Text style={[t.fontSansBold, t.textWhite]}>{buttonText}</Text>
        </PressableOpacity>
      </View>
    </View>
  );
};

// const TooltipComponent = styled.View`
//   background-color: ${palette.turquoise};
//   position: absolute;
//   border-radius: 16px;
//   top: ${({ top }) => top + 20}px;
//   padding: 16px;
//   max-width: 240px;
// `;
// const StepsRow = styled.View`
//   flex-direction: row;
//   margin-top: 8px;
// `;
// const ButtonText = styled.TouchableOpacity`
//   align-items: flex-end;
// `;
