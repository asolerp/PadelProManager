import React, {useState} from 'react';

import {ImageBackground, Text, View} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Formik} from 'formik';
import {DATE_FORM} from '../../Utils/date-ext';

import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {ImageSelector} from '../../Components/NewPlayer/ImageSelector';
import {Select} from '../../Components/UI/Select';
import {gender, lateralidad, playerCategories} from '../../Utils/lists';

import {provincias} from '../../Utils/provincias-espanolas';
import {municipios} from '../../Utils/municipios-espanoles';
import {useEditProfile} from './hooks/useEditProfile';
import {sortByLabel} from '../../Utils/sorts';
import {ProfileSettings} from '../../Components/Profile/ProfileSettings';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useDeleteAccount} from './hooks/useDeleteAccount';
import {openScreenWithPush} from '../../Router/utils/actions';
import {NEW_PASSWORD_SCREEN_KEY} from '../NewPassword/NewPassword';

export const PROFILE_SCREEN_KEY = 'profileScreen';

export const ProfileScreen = () => {
  const {isCoach, isPlayer} = useFirebaseAuth();
  const [show, setShow] = useState(false);
  const {handleDelete} = useDeleteAccount();
  const {
    handleUpdateProfile,
    handleSubmitForm,
    profileFormRef,
    initialValues,
    onImagePress,
    response,
  } = useEditProfile();

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  return (
    <ScreenLayout edges={['top', 'right', 'left', 'bottom']}>
      <Header
        withBack
        title={'Perfil'}
        rightSide={isPlayer && <ProfileSettings />}
      />
      <HDivider />
      <KeyboardAwareScrollView
        style={[t.flex1, t.pB10]}
        showsVerticalScrollIndicator={false}>
        <Formik
          innerRef={profileFormRef}
          validateOnBlur={false}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={values => handleUpdateProfile(values)}>
          {({
            handleChange,
            touched,
            handleBlur,
            values,
            errors,
            setFieldValue,
          }) => (
            <>
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                date={new Date()}
                locale="es-ES"
                display="spinner"
                onConfirm={date => {
                  setFieldValue('birthDate', format(date, DATE_FORM));
                  setShow(false);
                }}
                onCancel={hideDatePicker}
              />
              <View style={[t.flexGrow, t.pB5]}>
                <ImageBackground
                  blurRadius={10}
                  source={{uri: initialValues?.profileImg}}
                  style={[t.p5, t.itemsCenter, t.justifyCenter]}>
                  <ImageSelector
                    imageSource={initialValues?.profileImg}
                    onImagePress={onImagePress}
                    imageSelected={response}
                    name={`${values?.firstName?.[0]?.toUpperCase() || ''}${
                      values?.secondName?.[0]?.toUpperCase() || ''
                    }`}
                  />
                </ImageBackground>
                <View style={[t.pX4, t.mT5]}>
                  <Text style={[t.fontSansBold, t.mB4, t.textGray600]}>
                    Información personal
                  </Text>
                  <View style={[t.flexRow, t.mB4]}>
                    <Input
                      placeholder="Nombre"
                      value={values.firstName}
                      name="firstName"
                      error={errors.firstName}
                      onBlur={handleBlur('firstName')}
                      onChangeText={handleChange('firstName')}
                      touched={touched.firstName}
                      style={[t.flex1, t.mR4]}
                    />
                    <Input
                      placeholder="Apellidos"
                      value={values.secondName}
                      name="secondName"
                      error={errors.secondName}
                      onBlur={handleBlur('secondName')}
                      onChangeText={handleChange('secondName')}
                      touched={touched.secondName}
                      style={[t.flex2]}
                    />
                  </View>
                  <Input
                    editable={false}
                    placeholder="Email"
                    value={values.email}
                    name="email"
                    error={errors.email}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    touched={touched.email}
                    style={[t.flex1, t.mB4]}
                    inputStyle={[t.textGray600]}
                  />
                  <View style={[t.flexRow, t.mB4]}>
                    <Input
                      placeholder="Teléfono"
                      value={values.phone}
                      name="phone"
                      error={errors.phone}
                      keyboardType="numeric"
                      onBlur={handleBlur('phone')}
                      onChangeText={handleChange('phone')}
                      touched={touched.phone}
                      style={[t.flex1, t.mR4]}
                    />
                    <Input
                      editable={true}
                      value={values?.birthDate}
                      onPressIn={() => showDatePicker()}
                      placeholder="Fecha de nacimiento"
                      error={errors.birthDate}
                      onBlur={handleBlur('birthDate')}
                      style={[t.flex1, t.mR4]}
                    />
                    <Select
                      list={gender}
                      placeholder="Género"
                      value={gender?.find(s => s.value === values.gender)}
                      name="gender"
                      error={errors.gender}
                      onBlur={handleBlur('gender')}
                      onChange={v => setFieldValue('gender', v)}
                      label="Género"
                      style={[t.flex1]}
                    />
                  </View>
                  {!isCoach && (
                    <View style={[t.flexRow, t.mB4]}>
                      <Select
                        list={lateralidad}
                        placeholder="Lateralidad"
                        value={lateralidad?.find(s => s.value === values?.hand)}
                        name="hand"
                        error={errors.hand}
                        onBlur={handleBlur('hand')}
                        onChange={v => setFieldValue('hand', v)}
                        label="Lateralidad"
                        style={[t.flex1, t.mR4]}
                      />

                      <Select
                        list={playerCategories}
                        placeholder="Categoría"
                        value={playerCategories?.find(
                          s => s.value === values?.category,
                        )}
                        name="category"
                        error={errors?.category}
                        onBlur={handleBlur('category')}
                        onChange={v =>
                          setFieldValue('category', v, {shouldValidate: true})
                        }
                        label="Categoría"
                        style={[t.flex1]}
                      />
                    </View>
                  )}
                  <View style={[t.flexRow, t.mB4]}>
                    <Select
                      withScroll
                      list={provincias.sort(sortByLabel)}
                      placeholder="Provincia"
                      value={provincias?.find(
                        s => s.value === values.provincia,
                      )}
                      name="provincia"
                      error={errors.provincia}
                      onBlur={handleBlur('provincia')}
                      onChange={v => setFieldValue('provincia', v)}
                      label="Provincia"
                      style={[t.flex1, t.mR4]}
                    />
                    <Select
                      withScroll
                      disabled={!values.provincia}
                      list={municipios
                        .filter(
                          munici =>
                            munici?.value?.substring(0, 2) === values.provincia,
                        )
                        .sort(sortByLabel)}
                      placeholder="Municipio"
                      value={municipios?.find(
                        s => s.value === values.municipio,
                      )}
                      name="municipio"
                      error={errors.municipio}
                      onBlur={handleBlur('municipio')}
                      onChange={v => setFieldValue('municipio', v)}
                      label="Municipio"
                      style={[t.flex1]}
                    />
                  </View>
                  <Text style={[t.fontSansBold, t.mB4, t.textGray600]}>
                    Sobre mi
                  </Text>
                  <Input
                    multiline
                    labelText="Descripción personal"
                    placeholder="Cuéntanos que tipo de entrenador eres"
                    value={values.personalDescription}
                    name="personalDescription"
                    error={errors.personalDescription}
                    onBlur={handleBlur('personalDescription')}
                    onChangeText={handleChange('personalDescription')}
                    touched={touched.personalDescription}
                    style={[t.flex1, t.mR4]}
                  />
                </View>
                <PressableOpacity
                  onPress={() => openScreenWithPush(NEW_PASSWORD_SCREEN_KEY)}>
                  <Text
                    style={[
                      t.mT5,
                      t.textCenter,
                      t.fontSansBold,
                      t.textInfoDark,
                    ]}>
                    Cambiar contraseña
                  </Text>
                </PressableOpacity>
                <PressableOpacity onPress={() => handleDelete()}>
                  <Text
                    style={[
                      t.mT5,
                      t.textCenter,
                      t.fontSansBold,
                      t.textErrorDark,
                    ]}>
                    Eliminar cuenta
                  </Text>
                </PressableOpacity>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <HDivider />
      <View style={[t.pX4]}>
        <Button
          active
          size="lg"
          title={'Guardar'}
          style={[t.mT3]}
          onPress={handleSubmitForm}
        />
      </View>
    </ScreenLayout>
  );
};
