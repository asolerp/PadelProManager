import React, {useState} from 'react';

import {View, Text} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {useNewMatchForm} from './hooks/useNewMatchForm';

import {DATE_FORM} from '../../Utils/date-ext';
import {PlayersSelector} from '../../Components/NewMatch/PlayersSelector';
import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {SwitchInput} from '../../Components/UI/SwitchInput';
import {Select} from '../../Components/UI/Select';
import {cateogries, rounds, sex} from '../../Utils/lists';

import {LoadingModal} from '../../Components/Common/LoadingModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {usePermissions} from '../../Hooks/usePermissions';
import {useForm, Controller} from 'react-hook-form';

export const NEW_MATCH_SCREEN_KEY = 'newMatchScreen';

export const NewMatchScreen = () => {
  const {
    handleSubmitForm,
    selectedPlayers,
    initialValues,
    errorPlayers,
    loading,
  } = useNewMatchForm();

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
  });

  console.log(isValid);

  const [show, setShow] = useState(false);
  const {isCoach} = usePermissions();

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const watchTournament = watch('tournament', false);

  return (
    <ScreenLayout edges={['top', 'right', 'left', 'bottom']}>
      <Header withBack title="Nuevo partido" />
      <LoadingModal text="Creando nuevo partido..." isVisible={loading} />
      <KeyboardAwareScrollView
        style={[t.flex1, t.mT5]}
        showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Text style={[t.textLg, t.fontSans, t.textGray600]}>
              La creación de partidos te permetirá registrar todos los golpes de
              tus jugadores para poder analizarlos a posteriori.
            </Text>
          </View>
          <DateTimePickerModal
            isVisible={show}
            mode="date"
            date={new Date()}
            locale="es-ES"
            display="inline"
            onConfirm={date => {
              setValue('date', format(date, DATE_FORM), {shouldValidate: true});
              setShow(false);
            }}
            onCancel={hideDatePicker}
          />
          <View style={[t.flexGrow, t.mT5]}>
            <View style={[t.flexRow, t.justifyBetween, t.mB4]}>
              <Controller
                control={control}
                rules={{
                  required: 'La fecha es obligatoria',
                }}
                render={({field: {onBlur, value}, fieldState: {error}}) => (
                  <Input
                    editable={false}
                    value={value}
                    onPressIn={() => showDatePicker()}
                    placeholder="Fecha del partido"
                    error={error?.message}
                    onBlur={onBlur}
                    style={[t.flex1, t.mR3]}
                  />
                )}
                name="date"
              />
              <Controller
                control={control}
                rules={{
                  required: 'El nombre del club es obligatorio',
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <Input
                    placeholder="Club"
                    value={value}
                    error={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={[t.flex1]}
                  />
                )}
                name="club"
              />
            </View>
            <View style={[t.flexRow, t.justifyBetween, t.mB4]}>
              <Controller
                control={control}
                rules={{
                  required: 'La categoría es obligatoria',
                }}
                render={({field: {onBlur, value}, fieldState: {error}}) => (
                  <Select
                    list={cateogries}
                    placeholder="Categoría"
                    value={cateogries?.find(c => c.value === Number(value))}
                    error={error?.message}
                    onBlur={onBlur}
                    onChange={v =>
                      setValue('category', v, {shouldValidate: true})
                    }
                    label="Categoría"
                    style={[t.flex1, t.mR3]}
                  />
                )}
                name="category"
              />
              <Controller
                control={control}
                rules={{
                  required: 'El tipo de partida es obligatoria',
                }}
                render={({field: {onBlur, value}, fieldState: {error}}) => (
                  <Select
                    list={sex}
                    placeholder="Masculino / Femenino / Mixtos"
                    value={sex?.find(s => s.value === value)}
                    name="sex"
                    error={error?.message}
                    onBlur={onBlur}
                    onChange={v => setValue('sex', v, {shouldValidate: true})}
                    label="Género"
                    style={[t.flex2]}
                  />
                )}
                name="sex"
              />
            </View>
            <Controller
              control={control}
              render={({field: {onBlur, value}}) => (
                <SwitchInput
                  label="Torneo"
                  onBlur={onBlur}
                  onValueChange={v => setValue('tournament', v)}
                  value={value}
                />
              )}
              name="tournament"
            />
            {watchTournament && (
              <View style={[t.flexRow, t.mB3]}>
                <Controller
                  control={control}
                  render={({
                    field: {onChange, onBlur, value},
                    fieldState: {error},
                  }) => (
                    <Input
                      placeholder="Nombre del torneo"
                      value={value}
                      error={error?.message}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      label="Nombre del torneo"
                      style={[t.flex2, t.mR3]}
                    />
                  )}
                  name="tournamentName"
                />
                <Controller
                  control={control}
                  render={({field: {onBlur, value}}) => (
                    <Select
                      list={rounds}
                      placeholder="Ronda"
                      value={rounds?.find(r => r.value === Number(value))}
                      error={errors.round}
                      onBlur={onBlur}
                      onChange={v => setValue('round', v)}
                      label="Ronda"
                      style={[t.flex1]}
                    />
                  )}
                  name="round"
                />
              </View>
            )}
            {isCoach && (
              <View style={[t.mY5]}>
                <PlayersSelector />
                {errorPlayers && <Text>Selecciona todos los jugadores</Text>}
              </View>
            )}
          </View>
        </>
      </KeyboardAwareScrollView>
      <HDivider />
      <Button
        active
        size="lg"
        disabled={!isValid || Object.keys(selectedPlayers)?.length < 4}
        loading={loading}
        title="Crear"
        style={[t.mT3]}
        onPress={handleSubmit(handleSubmitForm)}
      />
    </ScreenLayout>
  );
};
