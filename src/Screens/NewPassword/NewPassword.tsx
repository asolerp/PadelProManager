import React, {useState} from 'react';
import {View} from 'react-native';
import {Header, ScreenLayout} from '../../Components/Layout';
import {InputLogin} from '../../Components/Login/InputLogin';
import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {Spacer} from '../../Components/UI/Spacer';
import t from '../../Theme/theme';
import {useUpdatePassword} from './hooks/useUpdatePassword';

export const NEW_PASSWORD_SCREEN_KEY = 'newPasswordScreen';

export const NewPassword = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [currentPass, setCurrentPass] = useState();
  const [pass1, setPass1] = useState();
  const [pass2, setPass2] = useState();
  const {handleUpdatePassword} = useUpdatePassword();

  const disabled = !currentPass || !pass1 || !pass2 || pass1 !== pass2;

  return (
    <ScreenLayout edges={['top', 'bottom']}>
      <Header withBack title="Cambiar contraseña" />
      <HDivider />
      <View style={[t.pX4, t.mT5]}>
        <InputLogin
          clear
          leftIconName="ios-lock-closed"
          rightIconName={visiblePassword ? 'ios-eye' : 'ios-eye-off'}
          onPressRightIcon={() => setVisiblePassword(!visiblePassword)}
          secureTextEntry={!visiblePassword}
          placeholder="Contraseña actual"
          onChangeText={setCurrentPass}
          value={currentPass}
        />
        <Spacer space={3} />
        <InputLogin
          clear
          leftIconName="ios-lock-closed"
          rightIconName={visiblePassword ? 'ios-eye' : 'ios-eye-off'}
          onPressRightIcon={() => setVisiblePassword(!visiblePassword)}
          secureTextEntry={!visiblePassword}
          placeholder="Nueva contraseña"
          onChangeText={setPass1}
          value={pass1}
        />
        <Spacer space={3} />
        <InputLogin
          clear
          leftIconName="ios-lock-closed"
          rightIconName={visiblePassword ? 'ios-eye' : 'ios-eye-off'}
          onPressRightIcon={() => setVisiblePassword(!visiblePassword)}
          secureTextEntry={!visiblePassword}
          placeholder="Repetir Contraseña"
          onChangeText={setPass2}
          value={pass2}
        />
      </View>
      <View style={[t.flexGrow, t.justifyEnd, t.pX4]}>
        <Button
          disabled={disabled}
          onPress={() => handleUpdatePassword(currentPass, pass1)}
          title="Cambiar contraseña"
          size="lg"
          active
        />
      </View>
    </ScreenLayout>
  );
};
