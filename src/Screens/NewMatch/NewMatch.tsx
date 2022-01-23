import React, {useState} from 'react';

import {View} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {useNewMatchForm} from './hooks/useNewMatchForm';
import {Formik} from 'formik';
import {DATE_MATCH} from '../../Utils/date-ext';
import {PlayersSelector} from '../../Components/NewMatch/PlayersSelector';
import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';

export const NEW_MATCH_SCREEN_KEY = 'newMatchScreen';

export const NewMatchScreen = () => {
  const {
    initialValues,
    setInputs,
    handleCreateNewMatch,
    newMatchFormRef,
    loading,
  } = useNewMatchForm();

  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  return (
    <ScreenLayout edges={['top', 'right', 'left', 'bottom']}>
      <>
        <Header withBack title="Nuevo partido" />
        <Formik
          innerRef={newMatchFormRef}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={values => setInputs(values)}>
          {({handleChange, handleBlur, values, errors, setFieldValue}) => (
            <>
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                date={new Date()}
                locale="es-ES"
                display="inline"
                onConfirm={date => {
                  setFieldValue('date', format(date, DATE_MATCH));
                  setShow(false);
                }}
                onCancel={hideDatePicker}
              />
              <View style={[t.flexGrow, t.mT5]}>
                <Input
                  placeholder="Club"
                  value={values.club}
                  name="club"
                  error={errors.club}
                  onBlur={handleBlur('club')}
                  onChangeText={handleChange('club')}
                  label="Club"
                  style={[t.mB4]}
                />
                <View style={[t.flexRow, t.justifyBetween, t.mB4]}>
                  <Input
                    editable={false}
                    value={values?.date}
                    onPressIn={() => showDatePicker()}
                    placeholder="Fecha del partido"
                    label="Fecha del partido"
                    style={[t.flex2, t.mR5]}
                  />
                  <Input
                    placeholder="Categoría"
                    value={values.category}
                    name="category"
                    error={errors.category}
                    onBlur={handleBlur('category')}
                    onChangeText={handleChange('category')}
                    label="Categoría"
                    style={[t.flex1]}
                  />
                </View>
                <View style={[t.flexRow, t.mB3]}>
                  <Input
                    placeholder="Nombre del torneo"
                    value={values.tournamentName}
                    name="tournamentName"
                    error={errors.tournamentName}
                    onBlur={handleBlur('tournamentName')}
                    onChangeText={handleChange('tournamentName')}
                    label="Nombre del torneo"
                    style={[t.flex2, t.mR3]}
                  />
                  <Input
                    placeholder="Ronda"
                    value={values.round}
                    name="round"
                    error={errors.round}
                    onBlur={handleBlur('round')}
                    onChangeText={handleChange('round')}
                    label="Ronda"
                    style={[t.flex1]}
                  />
                </View>
                <PlayersSelector />
              </View>
            </>
          )}
        </Formik>
        <HDivider />
        <Button
          active
          loading={loading}
          title="Crear partido"
          style={[t.mT3]}
          onPress={handleCreateNewMatch}
        />
      </>
    </ScreenLayout>
  );
};
