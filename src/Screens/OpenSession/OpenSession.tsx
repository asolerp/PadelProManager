import React, {useState} from 'react';

import {Text, View} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';

import {Formik} from 'formik';
import {DATE_FORM, HOUR_FORMAT} from '../../Utils/date-ext';

import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useNewOpenSessionForm} from './hooks/useNewOpenSessionForm';

import {useTranslationWrapper} from '../../Hooks/useTranslationsWrapper';
import {getCurrencies} from 'react-native-localize';
import {Select} from '../../Components/UI/Select';
import {provincias} from '../../Utils/provincias-espanolas';
import {municipios} from '../../Utils/municipios-espanoles';
import {sortByLabel} from '../../Utils/sorts';

export const NEW_OPEN_SESSION_SCREEN_KEY = 'newOpenSession';

export const NewOpenSessionScreen = ({route}) => {
  const session = route?.params?.session;

  const {
    initialValues,
    startDateParsed,
    handleSubmitForm,
    newSessionFormRef,
    setStartDateParsed,
    handleSubmitSessionForm,
    loading: loadingCreateUpdate,
  } = useNewOpenSessionForm();

  const {loc} = useTranslationWrapper();

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [timeInput, setTimeInput] = useState();

  const showDatePicker = (m, input) => {
    setTimeInput(input);
    setMode(m);
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  return (
    <ScreenLayout>
      <Header
        title={
          session
            ? loc('new_open_session_edit_title')
            : loc('new_open_session_create_title')
        }
        withBack
      />
      <HDivider />
      <KeyboardAwareScrollView
        style={[t.flex1, t.pX4]}
        showsVerticalScrollIndicator={false}>
        {!session && (
          <View style={[t.mT5]}>
            <Text style={[t.textLg, t.fontSans, t.textGray600]}>
              Crear una sesión y compártela todo Padel Pro. Jugadores de
              cualquier parte podrán ver tu sesión y contratar tus servicios.
            </Text>
          </View>
        )}
        <Formik
          innerRef={newSessionFormRef}
          validateOnBlur={false}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={values => handleSubmitSessionForm(values)}>
          {({
            setFieldValue,
            handleChange,
            handleBlur,
            touched,
            values,
            errors,
          }) => (
            <>
              <DateTimePickerModal
                isVisible={show}
                mode={mode}
                date={startDateParsed}
                locale="es-ES"
                display="spinner"
                onConfirm={date => {
                  setStartDateParsed(date);
                  setFieldValue(
                    timeInput,
                    format(date, mode === 'date' ? DATE_FORM : HOUR_FORMAT),
                  );
                  setShow(false);
                }}
                onCancel={hideDatePicker}
              />
              <View style={[t.flexGrow, t.mT10]}>
                <Input
                  placeholder={loc('default_club')}
                  value={values?.club}
                  name="club"
                  error={errors.club}
                  onBlur={handleBlur('club')}
                  onChangeText={handleChange('club')}
                  touched={touched.club}
                  style={[t.flex1, t.mB3]}
                />
                <Select
                  withScroll
                  list={provincias.sort(sortByLabel)}
                  placeholder="Provincia"
                  value={provincias?.find(s => s.value === values.provincia)}
                  name="provincia"
                  error={errors.provincia}
                  onBlur={handleBlur('provincia')}
                  onChange={v => setFieldValue('provincia', v)}
                  label="Provincia"
                  style={[t.flex1, t.mB4]}
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
                  value={municipios?.find(s => s.value === values.municipio)}
                  name="municipio"
                  error={errors.municipio}
                  onBlur={handleBlur('municipio')}
                  onChange={v => setFieldValue('municipio', v)}
                  label="Municipio"
                  style={[t.flex1, t.mB4]}
                />
                <Input
                  placeholder={loc('new_session_form_session_name')}
                  value={values?.title}
                  name="title"
                  error={errors.title}
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                  touched={touched.title}
                  style={[t.flex1, t.mB3]}
                />
                <Input
                  placeholder={loc('new_session_form_players_notes')}
                  value={values?.notes}
                  name="notes"
                  error={errors.notes}
                  onBlur={handleBlur('notes')}
                  onChangeText={handleChange('notes')}
                  touched={touched.notes}
                  style={[t.flex1, t.mB3]}
                  inputStyle={[t.h20]}
                  multiline={true}
                  numberOfLines={5}
                />

                <View style={[t.flexRow, t.mB4]}>
                  <Input
                    editable={false}
                    value={values?.date}
                    onInputPress={() => showDatePicker('date', 'date')}
                    placeholder={loc('default_date')}
                    error={errors.date}
                    onBlur={handleBlur('date')}
                    style={[t.flex1, t.mR3]}
                  />
                  <Input
                    value={values?.price}
                    subfix={String(getCurrencies()[0])}
                    onChangeText={handleChange('price')}
                    keyboardType="decimal-pad"
                    labelText={loc('new_session_form_price_session')}
                    placeholder={loc('default_price')}
                    error={errors.price}
                    onBlur={handleBlur('price')}
                    style={[t.flex1]}
                  />
                </View>
                <View style={[t.flexRow, t.mB4]}>
                  <Input
                    editable={false}
                    value={values?.startTime}
                    onInputPress={() => showDatePicker('time', 'startTime')}
                    placeholder={loc('default_start_time')}
                    error={errors.startTime}
                    onBlur={handleBlur('startTime')}
                    style={[t.flex1, t.mR3]}
                  />
                  <Input
                    editable={false}
                    value={values?.endTime}
                    onInputPress={() => showDatePicker('time', 'endTime')}
                    placeholder={loc('default_end_time')}
                    error={errors.endTime}
                    onBlur={handleBlur('endTime')}
                    style={[t.flex1]}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <HDivider />
      <View style={[t.pX4, t.pB4]}>
        {session && (
          <Button
            disabled={loadingCreateUpdate}
            type="error"
            size="lg"
            title="Eliminar"
            style={[t.mT3]}
            onPress={() => handleDelete(repDays)}
          />
        )}
        <Button
          loading={loadingCreateUpdate}
          disabled={loadingCreateUpdate}
          active
          size="lg"
          title={session ? loc('default_edit') : loc('default_create')}
          style={[t.mY3]}
          onPress={handleSubmitForm}
        />
      </View>
    </ScreenLayout>
  );
};
