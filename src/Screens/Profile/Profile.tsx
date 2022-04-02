import React, {useContext, useState} from 'react';

import {View} from 'react-native';
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
import {gender, lateralidad} from '../../Utils/lists';

import {provincias} from '../../Utils/provincias-espanolas';
import {municipios} from '../../Utils/municipios-espanoles';
import {useEditProfile} from './hooks/useEditProfile';
import {sortByLabel} from '../../Utils/sorts';
import {ProfileSettings} from '../../Components/Profile/ProfileSettings';
import {AuthContext} from '../../Context/AuthContex';

export const PROFILE_SCREEN_KEY = 'profileScreen';

export const ProfileScreen = () => {
  const {isCoach} = useContext(AuthContext);
  const [show, setShow] = useState(false);
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
      <Header withBack title={'Mi perfil'} rightSide={<ProfileSettings />} />
      <KeyboardAwareScrollView
        style={[t.flex1]}
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
              <View style={[t.flexGrow, t.mT10]}>
                <ImageSelector
                  imageSource={initialValues?.profileImg}
                  onImagePress={onImagePress}
                  imageSelected={response}
                  name={`${values?.firstName?.[0]?.toUpperCase() || ''}${
                    values?.secondName?.[0]?.toUpperCase() || ''
                  }`}
                />

                <Input
                  placeholder="Nombre"
                  value={values.firstName}
                  name="firstName"
                  error={errors.firstName}
                  onBlur={handleBlur('firstName')}
                  onChangeText={handleChange('firstName')}
                  touched={touched.firstName}
                  style={[t.flex1, t.mB4]}
                />
                <Input
                  placeholder="Apellidos"
                  value={values.secondName}
                  name="secondName"
                  error={errors.secondName}
                  onBlur={handleBlur('secondName')}
                  onChangeText={handleChange('secondName')}
                  touched={touched.secondName}
                  style={[t.flex1, t.mB4]}
                />

                <View style={[t.flexRow, t.mB4]}>
                  <Input
                    placeholder="Email"
                    value={values.email}
                    name="email"
                    error={errors.email}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    touched={touched.email}
                    style={[t.flex3]}
                  />
                </View>
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
                    style={[t.flex1, t.mR3]}
                  />
                  <Input
                    editable={false}
                    value={values?.birthDate}
                    onPressIn={() => showDatePicker()}
                    placeholder="Fecha de nacimiento"
                    error={errors.birthDate}
                    onBlur={handleBlur('birthDate')}
                    style={[t.flex1]}
                  />
                </View>
                <View style={[t.flexRow, t.mB4]}>
                  <Select
                    list={gender}
                    placeholder="Género"
                    value={gender?.find(s => s.value === values.gender)}
                    name="gender"
                    error={errors.gender}
                    onBlur={handleBlur('gender')}
                    onChange={v => setFieldValue('gender', v)}
                    label="Género"
                    style={[t.flex1, !isCoach && t.mR3]}
                  />
                  {!isCoach && (
                    <Select
                      list={lateralidad}
                      placeholder="Lateralidad"
                      value={lateralidad?.find(s => s.value === values?.hand)}
                      name="hand"
                      error={errors.hand}
                      onBlur={handleBlur('hand')}
                      onChange={v => setFieldValue('hand', v)}
                      label="Lateralidad"
                      style={[t.flex1]}
                    />
                  )}
                </View>
                <View style={[t.flexRow, t.mB4]}>
                  <Select
                    list={provincias.sort(sortByLabel)}
                    placeholder="Provincia"
                    value={provincias?.find(s => s.value === values.provincia)}
                    name="provincia"
                    error={errors.provincia}
                    onBlur={handleBlur('provincia')}
                    onChange={v => setFieldValue('provincia', v)}
                    label="Provincia"
                    style={[t.flex1, t.mR3]}
                  />
                  <Select
                    list={municipios
                      .filter(
                        munici =>
                          munici?.value?.substring(0, 2) === values.provincia,
                      )
                      .sort(sortByLabel)}
                    placeholder="Municipio"
                    value={municipios?.find(s => s.value === values.municipio)}
                    name="municipio"
                    error={errors.municipio}
                    onBlur={handleBlur('municipio')}
                    onChange={v => setFieldValue('municipio', v)}
                    label="Municipio"
                    style={[t.flex1]}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <HDivider />
      <Button
        active
        size="lg"
        title={'Guardar'}
        style={[t.mT3]}
        onPress={handleSubmitForm}
      />
    </ScreenLayout>
  );
};
