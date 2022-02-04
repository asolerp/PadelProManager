import React, {useState} from 'react';

import {ScrollView, View} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {useNewMatchForm} from './hooks/useNewMatchForm';
import {Formik} from 'formik';
import {DATE_FORM} from '../../Utils/date-ext';
import {PlayersSelector} from '../../Components/NewMatch/PlayersSelector';
import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {SwitchInput} from '../../Components/UI/SwitchInput';
import {Select} from '../../Components/UI/Select';
import {cateogries, rounds, sex} from '../../Utils/lists';
import {newMatchValidationSchema} from './utils/validation';
import {LoadingModal} from '../../Components/Common/LoadingModal';

export const NEW_MATCH_SCREEN_KEY = 'newMatchScreen';

export const NewMatchScreen = () => {
  const {
    initialValues,
    handleCreateNewMatch,
    handleSubmitForm,
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
      <Header withBack title="Nuevo partido" />
      <LoadingModal text="Creando nuevo partido..." isVisible={loading} />
      <ScrollView>
        <Formik
          innerRef={newMatchFormRef}
          validationSchema={newMatchValidationSchema}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={values => handleCreateNewMatch(values)}>
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
                display="inline"
                onConfirm={date => {
                  setFieldValue('date', format(date, DATE_FORM));
                  setShow(false);
                }}
                onCancel={hideDatePicker}
              />
              <View style={[t.flexGrow, t.mT5]}>
                <View style={[t.flexRow, t.justifyBetween, t.mB4]}>
                  <Input
                    editable={false}
                    name="date"
                    value={values?.date}
                    onPressIn={() => showDatePicker()}
                    placeholder="Fecha del partido"
                    error={errors.date}
                    onBlur={handleBlur('date')}
                    style={[t.flex1, t.mR3]}
                  />
                  <Input
                    placeholder="Club"
                    value={values.club}
                    name="club"
                    error={errors.club}
                    onBlur={handleBlur('club')}
                    onChangeText={handleChange('club')}
                    touched={touched.club}
                    label="Club"
                    style={[t.flex1]}
                  />
                </View>
                <View style={[t.flexRow, t.justifyBetween, t.mB4]}>
                  <Select
                    list={cateogries}
                    placeholder="Categoría"
                    value={cateogries?.find(c => c.value === values.category)}
                    name="category"
                    error={errors.category}
                    onBlur={handleBlur('category')}
                    onChange={v => setFieldValue('category', v)}
                    label="Categoría"
                    style={[t.flex1, t.mR3]}
                  />
                  <Select
                    list={sex}
                    placeholder="Masculino / Femenino / Mixtos"
                    value={sex?.find(s => s.value === values.sex)}
                    name="sex"
                    error={errors.category}
                    onBlur={handleBlur('sex')}
                    onChange={v => setFieldValue('sex', v)}
                    label="Género"
                    style={[t.flex2]}
                  />
                </View>
                <SwitchInput
                  label="Torneo"
                  onValueChange={v => setFieldValue('tournament', v)}
                  value={values.tournament}
                />
                {values?.tournament && (
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
                    <Select
                      list={rounds}
                      placeholder="Ronda"
                      value={rounds?.find(r => r.value === values.round)}
                      name="round"
                      error={errors.round}
                      onBlur={handleBlur('round')}
                      onChange={v => setFieldValue('round', v)}
                      label="Ronda"
                      style={[t.flex1]}
                    />
                  </View>
                )}
                <PlayersSelector />
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
        title="Crear"
        style={[t.mT3]}
        onPress={handleSubmitForm}
      />
    </ScreenLayout>
  );
};
