import React, {useState} from 'react';

import {View, Text, Platform} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {useNewMatchForm} from './hooks/useNewMatchForm';

import {DATE_FORM, HOUR_FORMAT, HOUR_FORMAT_12} from '../../Utils/date-ext';
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

  const [show, setShow] = useState(false);
  const [modeDate, setModeDate] = useState('date');
  const {isCoach, isAdmin} = usePermissions();
  const selectdPlayersValidationFail =
    isCoach && Object.keys(selectedPlayers)?.length < 4;

  const showDatePicker = mode => {
    setShow(true);
    setModeDate(mode);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const wathDate = watch('date', new Date());
  const watchTournament = watch('tournament', false);

  return (
    <>
      <DateTimePickerModal
        isVisible={show}
        mode={modeDate}
        date={wathDate || new Date()}
        locale="es-ES"
        display={Platform.OS === 'ios' && modeDate === 'date' && 'inline'}
        onConfirm={date => {
          setValue(
            modeDate === 'date' ? 'date' : 'startTime',
            format(date, modeDate === 'date' ? DATE_FORM : HOUR_FORMAT),
            {shouldValidate: true},
          );
          setShow(false);
        }}
        onCancel={hideDatePicker}
      />
      <ScreenLayout edges={['top', 'right', 'left', 'bottom']}>
        <Header withBack title="Nuevo partido" />
        <HDivider />
        <LoadingModal text="Creando nuevo partido..." isVisible={loading} />
        <KeyboardAwareScrollView
          style={[t.flex1, t.mT5, t.pX4]}
          showsVerticalScrollIndicator={false}>
          <>
            <View>
              <Text style={[t.fontSans, t.textGray600]}>
                {isCoach
                  ? 'La creación de partidos te permetirá registrar todos los golpes de tus jugadores para poder analizarlos a posteriori.'
                  : 'Crear una partida y registra todos tus golpes para despúes poder analizarlos'}
              </Text>
            </View>
            <View style={[t.flexGrow, t.mT7]}>
              <View style={[t.flexRow]}>
                <View style={[t.flex1, t.mR2]}>
                  <Controller
                    control={control}
                    rules={{
                      required: 'La fecha es obligatoria',
                    }}
                    render={({field: {onBlur, value}, fieldState: {error}}) => (
                      <Input
                        editable={false}
                        value={value}
                        onInputPress={() => showDatePicker('date')}
                        placeholder="Fecha del partido"
                        error={error?.message}
                        onBlur={onBlur}
                        style={[t.flex1, t.mB4]}
                      />
                    )}
                    name="date"
                  />
                </View>
                <View style={[t.flex1, t.mL2]}>
                  <Controller
                    control={control}
                    rules={{
                      required: 'La hora de inicio es obligatoria',
                    }}
                    render={({field: {onBlur, value}, fieldState: {error}}) => (
                      <Input
                        editable={false}
                        value={value}
                        onInputPress={() => showDatePicker('time')}
                        placeholder="Hora de inicio"
                        error={error?.message}
                        onBlur={onBlur}
                        style={[t.flex1, t.mB4]}
                      />
                    )}
                    name="startTime"
                  />
                </View>
              </View>
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
                    style={[t.flex1, t.mB4, t.p0]}
                  />
                )}
                name="club"
              />

              <Controller
                control={control}
                rules={{
                  required: 'La categoría es obligatoria',
                }}
                render={({field: {onBlur, value}, fieldState: {error}}) => (
                  <Select
                    list={cateogries(isAdmin)}
                    placeholder="Categoría"
                    value={cateogries(isAdmin)?.find(
                      c => c.value === Number(value),
                    )}
                    error={error?.message}
                    onBlur={onBlur}
                    onChange={v =>
                      setValue('category', v, {shouldValidate: true})
                    }
                    label="Categoría"
                    style={[t.flex1, t.mB4]}
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
                    placeholder="Sexo"
                    value={sex?.find(s => s.value === value)}
                    name="sex"
                    error={error?.message}
                    onBlur={onBlur}
                    onChange={v => setValue('sex', v, {shouldValidate: true})}
                    label="Género"
                    style={[t.flex1, t.mB4]}
                  />
                )}
                name="sex"
              />

              <Controller
                control={control}
                render={({field: {onBlur, value}}) => (
                  <SwitchInput
                    label="Estadísticas avanzadas"
                    subtitle={
                      'Las estadísitcas avanzadas permiten registrar el tipo de punto por jugador. (winner, error forzado y errores no forzados)'
                    }
                    onBlur={onBlur}
                    onValueChange={v => setValue('advanceStats', v)}
                    value={value}
                  />
                )}
                name="advanceStats"
              />
              <HDivider />
              <View style={[t.mB4]} />
              <Controller
                control={control}
                render={({field: {onBlur, value}}) => (
                  <SwitchInput
                    label="Punto de oro"
                    subtitle={
                      '¡Sin ventajas! Quien gane el punto en el 40-40 gana el jugo 💪'
                    }
                    onBlur={onBlur}
                    onValueChange={v => setValue('goldPoint', v)}
                    value={value}
                  />
                )}
                name="goldPoint"
              />
              <HDivider />
              <View style={[t.mB4]} />
              <Controller
                control={control}
                render={({field: {onBlur, value}}) => (
                  <SwitchInput
                    label="Torneo"
                    subtitle={
                      'Si el partido pertenece a un torneo, activa esta opción e introduce la ronda, nombre del toreno, etc..'
                    }
                    onBlur={onBlur}
                    onValueChange={v => setValue('tournament', v)}
                    value={value}
                  />
                )}
                name="tournament"
              />
              {watchTournament && (
                <>
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
                        style={[t.flex2, t.mB4]}
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
                </>
              )}
              <HDivider />
              {(isCoach || isAdmin) && (
                <View style={[t.mY5]}>
                  <PlayersSelector />
                  {errorPlayers && <Text>Selecciona todos los jugadores</Text>}
                </View>
              )}
            </View>
          </>
        </KeyboardAwareScrollView>
        <HDivider />
        <View style={[t.pX4]}>
          <Button
            active
            size="lg"
            disabled={!isValid || selectdPlayersValidationFail}
            loading={loading}
            title="Crear"
            style={[t.mY3]}
            onPress={handleSubmit(handleSubmitForm)}
          />
        </View>
      </ScreenLayout>
    </>
  );
};
