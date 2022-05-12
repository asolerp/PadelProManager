import React from 'react';
import Toast, {BaseToast} from 'react-native-toast-message';

import t from '../../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import PressableOpacity from '../../../Components/UI/PressableOpacity';
import {Circle} from '../../../Components/UI/Circle';

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: props => (
    <BaseToast
      {...props}
      style={[t.roundedFull, t.itemsCenter, t.pX2, {borderLeftWidth: 0}]}
      renderLeadingIcon={() => (
        <Circle color={t.bgSuccessLight}>
          <Icon
            name="ios-shield-checkmark"
            size={25}
            style={[t.textSuccessDark]}
          />
        </Circle>
      )}
      renderTrailingIcon={() => (
        <PressableOpacity onPress={() => Toast.hide()}>
          <Icon name="close" size={25} style={[t.mR2, t.textGray500]} />
        </PressableOpacity>
      )}
      text2Style={[t.textSuccessDark, t.fontSansMedium, t.textSm]}
      text1Style={[t.textGray700, t.fontMonoMedium, t.textSm]}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: props => (
    <BaseToast
      {...props}
      style={[t.roundedFull, t.itemsCenter, t.pX2, {borderLeftWidth: 0}]}
      renderLeadingIcon={() => (
        <Circle color={t.bgErrorDark}>
          <Icon name="ios-alert-circle" size={25} style={[t.textErrorDark]} />
        </Circle>
      )}
      renderTrailingIcon={() => (
        <PressableOpacity onPress={() => Toast.hide()}>
          <Icon name="close" size={25} style={[t.mR2, t.textGray500]} />
        </PressableOpacity>
      )}
      text2Style={[t.textErrorDark, t.fontSansMedium, t.textSm]}
      text1Style={[t.textGray700, t.fontMonoMedium, t.textSm]}
    />
  ),

  info: props => (
    <BaseToast
      {...props}
      style={[t.roundedFull, t.itemsCenter, t.pX2, {borderLeftWidth: 0}]}
      renderLeadingIcon={() => (
        <Circle color={t.bgInfoDark}>
          <Icon name="ios-alert-circle" size={25} style={[t.textInfoDark]} />
        </Circle>
      )}
      renderTrailingIcon={() => (
        <PressableOpacity onPress={() => Toast.hide()}>
          <Icon name="close" size={25} style={[t.mR2, t.textGray500]} />
        </PressableOpacity>
      )}
      text2Style={[t.textInfoDark, t.fontSansMedium, t.textSm]}
      text2Props={{numberOfLines: 0}}
      text1Style={[t.textGray700, t.fontMonoMedium, t.textSm]}
    />
  ),

  warning: props => (
    <BaseToast
      {...props}
      style={[t.roundedFull, t.itemsCenter, t.pX2, {borderLeftWidth: 0}]}
      renderLeadingIcon={() => (
        <Circle color={t.bgWarningDark}>
          <Icon name="ios-alert-circle" size={25} style={[t.textWarningDark]} />
        </Circle>
      )}
      renderTrailingIcon={() => (
        <PressableOpacity onPress={() => Toast.hide()}>
          <Icon name="close" size={25} style={[t.mR2, t.textGray500]} />
        </PressableOpacity>
      )}
      text2Style={[t.textWarningDark, t.fontSansMedium, t.textSm]}
      text1Style={[t.textGray700, t.fontMonoMedium, t.textSm]}
    />
  ),
};
