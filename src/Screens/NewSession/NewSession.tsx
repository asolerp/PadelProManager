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
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {popScreen} from '../../Router/utils/actions';
import {ModalListOfPlayers} from '../../Components/NewMatch/ModalListOfPlayers';

import Icon from 'react-native-vector-icons/Ionicons';
import {PlayerChip} from '../../Components/NewSession/PlayerChip';

export const NEW_SESSION_SCREEN_KEY = 'newSession';

export const NewSessionScreen = ({route}) => {
  const {startDate, session} = route?.params;

  const {
    newSessionFormRef,
    initialValues,
    handleSubmitForm,
    handleSaveNewSession,
  } = useNewSessionForm({startDate, session});

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [timeInput, setTimeInput] = useState();
  const [isVisible, setIsVisible] = useState();

  const [selectedPlayers, setSelectedPlayers] = useState();

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
    <ScreenLayout edges={['right', 'left', 'bottom']}>
      <ModalListOfPlayers
        multiple
        selectedPlayers={selectedPlayers}
        isVisible={isVisible}
        onSave={handleSavePlayer}
        onClose={() => setIsVisible(false)}
        withEmpyPlayer={false}
      />
      <View style={[t.mT5]}>
        <Header
          title={'Nueva sesión'}
          rightSide={
            <PressableOpacity onPress={() => popScreen()}>
              <Icon name="ios-close" size={30} />
            </PressableOpacity>
          }
        />
      </View>
      <KeyboardAwareScrollView>
        <Formik
          innerRef={newSessionFormRef}
          validateOnBlur={false}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={values =>
            handleSaveNewSession({...values, players: selectedPlayers})
          }>
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
                date={new Date()}
                locale="es-ES"
                display="spinner"
                onConfirm={date => {
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
                  placeholder="Nombre de la sesión"
                  value={values?.title}
                  name="title"
                  error={errors.title}
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                  touched={touched.title}
                  style={[t.flex1, t.mB3]}
                />
                <Input
                  placeholder="Descripción"
                  value={values?.description}
                  name="description"
                  error={errors.description}
                  onBlur={handleBlur('description')}
                  onChangeText={handleChange('description')}
                  touched={touched.description}
                  style={[t.flex1, t.mB3]}
                  inputStyle={[t.h32]}
                  multiline={true}
                  numberOfLines={5}
                />

                <View style={[t.flexRow, t.mB4]}>
                  <Input
                    editable={false}
                    value={values?.date}
                    onPressIn={() => showDatePicker('date', 'date')}
                    placeholder="Fecha"
                    error={errors.date}
                    onBlur={handleBlur('date')}
                    style={[t.flex1]}
                  />
                </View>
                <View style={[t.flexRow, t.mB4]}>
                  <Input
                    editable={false}
                    value={values?.startTime}
                    onPressIn={() => showDatePicker('time', 'startTime')}
                    placeholder="Hora inicio"
                    error={errors.startTime}
                    onBlur={handleBlur('startTime')}
                    style={[t.flex1, t.mR3]}
                  />
                  <Input
                    editable={false}
                    value={values?.endTime}
                    onPressIn={() => showDatePicker('time', 'endTime')}
                    placeholder="Hora fin"
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
                    placeholder="Jugadores"
                    style={[t.flex1]}
                    onPressIn={() => setIsVisible(true)}
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
        title="Crear"
        style={[t.mT3]}
        onPress={handleSubmitForm}
      />
    </ScreenLayout>
  );
};
