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

import {useNewSessionForm} from './hooks/useNewSessionForm';
// import * as Localization from 'expo-localization';

import {ModalListOfPlayers} from '../../Components/NewMatch/ModalListOfPlayers';

import {PlayerChip} from '../../Components/NewSession/PlayerChip';
import {useDeleteSession} from './hooks/useDeleteSession';
import {CalendarType} from '../../Components/NewSession/CalendarType';
import {WeekRep} from '../../Components/NewSession/WeekRep';
import {useTranslationWrapper} from '../../Hooks/useTranslationsWrapper';
import {getCurrencies} from 'react-native-localize';

export const NEW_SESSION_SCREEN_KEY = 'newSession';

export const NewSessionScreen = ({route}) => {
  const {startDate, session} = route?.params;

  const {
    repDays,
    sessionColor,
    initialValues,
    startDateParsed,
    setSessionColor,
    selectedPlayers,
    handleSetRepDays,
    handleSubmitForm,
    newSessionFormRef,
    setStartDateParsed,
    setSelectedPlayers,
    handleSubmitSessionForm,
    loading: loadingCreateUpdate,
  } = useNewSessionForm({startDate, session});

  const {handleDelete, loading} = useDeleteSession(
    session?.id,
    session?.internalId,
  );

  const {loc} = useTranslationWrapper();

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [timeInput, setTimeInput] = useState();
  const [isVisible, setIsVisible] = useState<boolean>();

  const handleSavePlayer = players => {
    setSelectedPlayers(players);
  };

  const handleRemovePlayer = player => {
    setSelectedPlayers(selectedPlayers?.filter(p => p.id !== player.id));
  };

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
      <ModalListOfPlayers
        multiple
        selectedPlayers={selectedPlayers}
        isVisible={isVisible}
        onSave={handleSavePlayer}
        onClose={() => setIsVisible(false)}
        withEmpyPlayer={false}
      />

      <Header
        title={
          session
            ? loc('new_session_edit_title')
            : loc('new_session_create_title')
        }
        withBack
      />
      <HDivider />
      <KeyboardAwareScrollView
        style={[t.flex1, t.pX4]}
        showsVerticalScrollIndicator={false}>
        {!session && (
          <View style={[t.mT5]}>
            <Text style={[t.textSm, t.fontSans, t.textGray600]}>
              Crear una sesión y compártela con tus jugadores. Te ayudamos a que
              te organices para que te puedas dedicar a lo que más importa, tus
              jugadores.
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
              <View style={[t.flexGrow, t.mT7]}>
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
                    onBlur={handleBlur('birtendTimehDate')}
                    style={[t.flex1]}
                  />
                </View>
                <View style={[t.flexRow, t.mB4]}>
                  <Input
                    empty
                    emptyValues={
                      selectedPlayers?.length > 0 && (
                        <View style={[t.flexRow, t.flexWrap]}>
                          {selectedPlayers?.map(p => (
                            <PlayerChip
                              player={p}
                              onClose={() => handleRemovePlayer(p)}
                            />
                          ))}
                        </View>
                      )
                    }
                    placeholder={loc('default_players')}
                    style={[t.flex1]}
                    onInputPress={() => setIsVisible(true)}
                  />
                </View>
                {/* <View
                  style={[
                    t.p3,
                    t.flexRow,
                    t.mB4,
                    {borderWidth: 1},
                    t.borderGray400,
                    t.roundedSm,
                    t.itemsCenter,
                    t.justifyBetween,
                  ]}>
                  <Text style={[t.fontSans, t.textBase, t.textGray600]}>
                    {loc('new_session_form_calendar_color')}
                  </Text>
                  <View style={[t.flexRow]}>
                    <CalendarType
                      color="blue"
                      active={sessionColor === 'blue'}
                      onPress={() => setSessionColor('blue')}
                    />
                    <CalendarType
                      color="yellow"
                      active={sessionColor === 'yellow'}
                      onPress={() => setSessionColor('yellow')}
                    />
                    <CalendarType
                      color="red"
                      active={sessionColor === 'red'}
                      onPress={() => setSessionColor('red')}
                    />
                  </View>
                </View> */}
                {/* <WeekRep onPressDay={handleSetRepDays} activeDays={repDays} /> */}
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <HDivider />
      <View style={[t.pX4, t.pB4]}>
        {session && (
          <Button
            disabled={loading || loadingCreateUpdate}
            type="error"
            size="lg"
            title="Eliminar"
            style={[t.mT3]}
            onPress={() => handleDelete(repDays)}
          />
        )}
        <Button
          loading={loading || loadingCreateUpdate}
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
