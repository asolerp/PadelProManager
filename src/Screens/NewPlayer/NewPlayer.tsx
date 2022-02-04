import React, {useState} from 'react';

import {ScrollView, View} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {useNewPlayerForm} from './hooks/useNewPlayerForm';
import {Formik} from 'formik';
import {DATE_FORM} from '../../Utils/date-ext';

import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {ImageSelector} from '../../Components/NewPlayer/ImageSelector';
import {Select} from '../../Components/UI/Select';
import {cateogries, gender, lateralidad} from '../../Utils/lists';

export const NEW_PLAYER_SCREEN_KEY = 'newPlayerScreen';

export const NewPlayerScreen = ({route}) => {
  const {edit, playerId} = route?.params;

  const {
    handleCreateNewPlayer,
    handleUpdatePlayer,
    handleSubmitForm,
    newPlayerFormRef,
    initialValues,
    onImagePress,
    response,
    loading,
  } = useNewPlayerForm(playerId);

  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  return (
    <ScreenLayout edges={['top', 'right', 'left', 'bottom']}>
      <Header withBack title={`${edit ? 'Editar' : 'Nuevo'} jugador`} />
      <ScrollView>
        <Formik
          innerRef={newPlayerFormRef}
          validateOnBlur={false}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={values =>
            edit ? handleUpdatePlayer(values) : handleCreateNewPlayer(values)
          }>
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
                <View style={[t.flexRow, t.mB4]}>
                  <Input
                    placeholder="Nombre"
                    value={values.firstName}
                    name="firstName"
                    error={errors.firstName}
                    onBlur={handleBlur('firstName')}
                    onChangeText={handleChange('firstName')}
                    touched={touched.firstName}
                    style={[t.flex1, t.mR3]}
                  />
                  <Input
                    placeholder="Apellidos"
                    value={values.secondName}
                    name="secondName"
                    error={errors.secondName}
                    onBlur={handleBlur('secondName')}
                    onChangeText={handleChange('secondName')}
                    touched={touched.secondName}
                    style={[t.flex1]}
                  />
                </View>
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
                    list={lateralidad}
                    placeholder="Lateralidad"
                    value={lateralidad?.find(s => s.value === values.hand)}
                    name="hand"
                    error={errors.hand}
                    onBlur={handleBlur('hand')}
                    onChange={v => setFieldValue('hand', v)}
                    label="Lateralidad"
                    style={[t.flex1, t.mR3]}
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
                <View style={[t.flexRow, t.mB4, t.w44]}>
                  <Select
                    list={cateogries}
                    placeholder="Categoría"
                    value={cateogries?.find(s => s.value === values.category)}
                    name="category"
                    error={errors.category}
                    onBlur={handleBlur('category')}
                    onChange={v => setFieldValue('category', v)}
                    label="Categoría"
                    style={[t.flex1]}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <HDivider />
      <Button
        active
        size="lg"
        loading={loading}
        title={`${edit ? 'Editar' : 'Crear'}`}
        style={[t.mT3]}
        onPress={handleSubmitForm}
      />
    </ScreenLayout>
  );
};
