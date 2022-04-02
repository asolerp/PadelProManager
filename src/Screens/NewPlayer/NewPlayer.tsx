import React, {useState} from 'react';

import {View, Text} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {useNewPlayerForm} from './hooks/useNewPlayerForm';
import {Formik} from 'formik';
import {DATE_FORM} from '../../Utils/date-ext';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {ImageSelector} from '../../Components/NewPlayer/ImageSelector';
import {Select} from '../../Components/UI/Select';
import {cateogries, gender, lateralidad} from '../../Utils/lists';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {usePermissions} from '../../Hooks/usePermissions';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useLogout} from '../../Hooks/useLogout';
import {Controller, useForm} from 'react-hook-form';

export const NEW_PLAYER_SCREEN_KEY = 'newPlayerScreen';

export const NewPlayerScreen = ({route}) => {
  const {edit, playerId} = route?.params;
  const {isCoach} = usePermissions();
  const {logout} = useLogout();
  const {handleSubmitForm, initialValues, onImagePress, response, loading} =
    useNewPlayerForm(playerId, edit);

  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const [show, setShow] = useState(false);

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
        title={isCoach ? `${edit ? 'Editar' : 'Nuevo'} jugador` : 'Mi perfil'}
        rightSide={
          !isCoach && (
            <PressableOpacity onPress={() => logout()}>
              <Icon name="ios-exit-outline" size={30} />
            </PressableOpacity>
          )
        }
      />
      <HDivider />
      <KeyboardAwareScrollView
        style={[t.flex1, t.pX4]}
        showsVerticalScrollIndicator={false}>
        {!edit && (
          <View style={[t.mT5]}>
            <Text style={[t.textLg, t.fontSans, t.textGray600]}>
              Crea un nuevo jugador para empezar a llevar un seguimiento de su
              evolución. Comparte sesiones de entrenamiento y registra sus
              partidos.
            </Text>
          </View>
        )}

        <>
          <DateTimePickerModal
            isVisible={show}
            mode="date"
            date={new Date()}
            locale="es-ES"
            display="spinner"
            onConfirm={date => {
              setValue('birthDate', format(date, DATE_FORM), {
                shouldValidate: true,
              });
              setShow(false);
            }}
            onCancel={hideDatePicker}
          />
          <View style={[t.flexGrow, t.mT10]}>
            <ImageSelector
              imageSource={initialValues?.profileImg}
              onImagePress={onImagePress}
              imageSelected={response}
              name={`${getValues()?.firstName?.[0]?.toUpperCase() || ''}${
                getValues()?.secondName?.[0]?.toUpperCase() || ''
              }`}
            />
            <Controller
              control={control}
              rules={{
                required: 'El nombre es obligatorio',
              }}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <Input
                  placeholder="Nombre"
                  value={value}
                  error={error?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={[t.flex1, t.mB4]}
                />
              )}
              name="firstName"
            />
            <Controller
              control={control}
              rules={{
                required: 'El apellido es obligatorio',
              }}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <Input
                  placeholder="Apellidos"
                  value={value}
                  error={error?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={[t.flex1, t.mB4]}
                />
              )}
              name="secondName"
            />

            <Controller
              control={control}
              rules={{
                required: 'El email es obligatorio',
              }}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <Input
                  placeholder="Email"
                  value={value}
                  error={error?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={[t.flex1, t.mB4]}
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{
                required: 'El teléfono es obligatorio',
              }}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <Input
                  keyboardType="numeric"
                  placeholder="Teléfono"
                  value={value}
                  error={error?.message}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={[t.flex1, t.mB4]}
                />
              )}
              name="phone"
            />
            <Controller
              control={control}
              render={({field: {onBlur, value}, fieldState: {error}}) => (
                <Input
                  editable={false}
                  placeholder="Cumpleaños"
                  onPressIn={() => showDatePicker()}
                  value={value}
                  error={error?.message}
                  onBlur={onBlur}
                  style={[t.flex1, t.mB4]}
                />
              )}
              name="birthDate"
            />

            <Controller
              control={control}
              rules={{
                required: 'La lateralidad es obligatoria',
              }}
              render={({field: {onBlur, value}, fieldState: {error}}) => (
                <Select
                  list={lateralidad}
                  placeholder="Lateralidad"
                  value={lateralidad?.find(s => s.value === value)}
                  name="hand"
                  error={error?.message}
                  onBlur={onBlur}
                  onChange={v => setValue('hand', v, {shouldValidate: true})}
                  label="Lateralidad"
                  style={[t.flex1, t.mB4]}
                />
              )}
              name="hand"
            />
            <Controller
              control={control}
              render={({field: {onBlur, value}, fieldState: {error}}) => (
                <Select
                  list={gender}
                  placeholder="Género"
                  value={lateralidad?.find(s => s.value === value)}
                  name="gender"
                  error={error?.message}
                  onBlur={onBlur}
                  onChange={v => setValue('gender', v, {shouldValidate: true})}
                  label="Género"
                  style={[t.flex1, t.mB4]}
                />
              )}
              name="gender"
            />

            <Controller
              control={control}
              rules={{
                required: 'La categoría es obligatoria',
              }}
              render={({field: {onBlur, value}, fieldState: {error}}) => (
                <Select
                  list={cateogries}
                  placeholder="Categoría"
                  value={cateogries?.find(s => s.value === value)}
                  name="category"
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
          </View>
        </>
      </KeyboardAwareScrollView>
      <HDivider />
      <View style={[t.pX4]}>
        <Button
          active
          disabled={!isValid}
          size="lg"
          loading={loading}
          title={`${edit ? 'Editar' : 'Crear'}`}
          style={[t.mT3, t.mB3]}
          onPress={handleSubmit(handleSubmitForm)}
        />
      </View>
    </ScreenLayout>
  );
};
