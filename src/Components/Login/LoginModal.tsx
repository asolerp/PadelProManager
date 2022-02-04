import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import Modal from 'react-native-modal';
import t from '../../Theme/theme';
import {Button} from '../UI/Button';
import {HDivider} from '../UI/HDivider';
import {Input} from '../UI/Input';
import {GoogleButton} from './GoogleButton';
import {Formik} from 'formik';
import {useLogin} from '../../Screens/Login/hooks/useLogin';
import {AppleButton} from './AppleButton';
import PressableOpacity from '../UI/PressableOpacity';

export const LoginModal = ({isModalVisible, onBackdropPress}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {loginFormRef, onGoogleButtonPress, onAppleButtonPress} = useLogin();

  // const {
  //   loginAccount,
  //   resetPassword,
  //   onGoogleButtonPress,
  //   onAppleButtonPress,
  //   loading,
  //   error,
  // } = useLogin();

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={onBackdropPress}>
      <View style={[t.bgWhite, t.pX6, t.pY4, t.roundedSm]}>
        <View style={[t.itemsCenter]}>
          <Image
            resizeMode="contain"
            source={require('../../Assets/logo.png')}
            style={(t.w14, [t.h20, t.mB5])}
          />
        </View>
        <View style={[t.wFull]}>
          <Text style={[t.fontSansBold, t.text2xl, t.mB5, t.textCenter]}>
            Accede a tu cuenta
          </Text>
          <View style={[t.flexCol, t.wFull]}>
            <Formik
              innerRef={loginFormRef}
              validateOnBlur={false}
              enableReinitialize={true}
              initialValues={{email: '', password: ''}}
              onSubmit={values => console.log(values)}>
              {({
                handleChange,
                touched,
                handleBlur,
                values,
                errors,
                setFieldValue,
              }) => (
                <>
                  <View style={[t.flexGrow, t.justifyEnd, t.mB3]}>
                    <Input
                      placeholder="Email"
                      value={values.email}
                      name="email"
                      error={errors.email}
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      touched={touched.email}
                      style={[t.wFull, t.mB3]}
                      inputStyle={[t.textWhite]}
                    />
                    <Input
                      placeholder="Password"
                      value={values.password}
                      name="password"
                      error={errors.password}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      touched={touched.password}
                      style={[t.mB3]}
                    />
                    <Button
                      title="Acceder"
                      type="info"
                      active
                      disabled={!email || !password}
                      style={[t.mB3]}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>

          <PressableOpacity>
            <Text style={[t.fontSansMedium, t.mB3]}>
              He olvidado mi contraseña
            </Text>
          </PressableOpacity>
          <HDivider style={[t.mB3]} />
          <GoogleButton
            onPress={() =>
              onGoogleButtonPress()
                .then(() => console.log('Signed in with Google!'))
                .catch(e => console.log(e))
            }
          />
          <View style={[t.mB3]} />
          <AppleButton
            onPress={() =>
              onAppleButtonPress().then(() =>
                console.log('Signed in with Apple!'),
              )
            }
          />
        </View>
      </View>
    </Modal>
  );
};
