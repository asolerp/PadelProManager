import React, {useState} from 'react';

import {View, Text, ImageBackground} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';

import {useNewPlayerForm} from './hooks/useNewPlayerForm';

import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../../Components/UI/Button';
import {HDivider} from '../../Components/UI/HDivider';
import {ImageSelector} from '../../Components/NewPlayer/ImageSelector';
import {Select} from '../../Components/UI/Select';
import {playerCategories, gender, lateralidad} from '../../Utils/lists';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {usePermissions} from '../../Hooks/usePermissions';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {useLogout} from '../../Hooks/useLogout';
import {Controller, useForm} from 'react-hook-form';

export const NEW_PLAYER_SCREEN_KEY = 'newPlayerScreen';

export const NewPlayerScreen = ({route}) => {
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      category: '',
    },
    mode: 'onChange',
  });
  const {edit, playerId} = route?.params;
  const {isCoach, isAdmin} = usePermissions();
  const {logout} = useLogout();
  const {handleSubmitForm, onImagePress, response, loading, initPlayerImg} =
    useNewPlayerForm(playerId, edit, reset);

  return (
    <ScreenLayout edges={['top', 'right', 'left', 'bottom']}>
      <Header
        withBack
        title={
          isCoach || isAdmin
            ? `${edit ? 'Editar' : 'Nuevo'} jugador`
            : 'Mi perfil'
        }
        rightSide={
          !isCoach &&
          !isAdmin && (
            <PressableOpacity onPress={() => logout()}>
              <Icon name="ios-exit-outline" size={30} />
            </PressableOpacity>
          )
        }
      />
      <HDivider />
      <KeyboardAwareScrollView
        style={[t.flex1]}
        showsVerticalScrollIndicator={false}>
        {!edit && (
          <View style={[t.mT5, t.pX4]}>
            <Text style={[t.textLg, t.fontSans, t.textGray600]}>
              Crea un nuevo jugador para empezar a llevar un seguimiento de su
              evolución. Comparte sesiones de entrenamiento y registra sus
              partidos.
            </Text>
          </View>
        )}

        <>
          <View style={[t.flexGrow]}>
            <ImageBackground
              blurRadius={10}
              source={{uri: initPlayerImg}}
              style={[t.p5, t.itemsCenter, t.justifyCenter]}>
              <ImageSelector
                imageSource={initPlayerImg}
                onImagePress={onImagePress}
                imageSelected={response}
                name={`${getValues()?.firstName?.[0]?.toUpperCase() || ''}${
                  getValues()?.secondName?.[0]?.toUpperCase() || ''
                }`}
              />
            </ImageBackground>
            <View style={[t.pX4, t.mT5]}>
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
                    placeholder="Nombre *"
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
                    placeholder="Apellidos *"
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
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email incorrecto',
                  },
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <Input
                    autoCapitalize="none"
                    editable={edit ? false : true}
                    placeholder="Email *"
                    value={value}
                    error={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={[t.flex1, t.mB4]}
                    inputStyle={[edit && t.textGray600]}
                  />
                )}
                name="email"
              />
              <Controller
                control={control}
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
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <Input
                    keyboardType="numeric"
                    placeholder="Edad"
                    value={value}
                    error={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    style={[t.flex1, t.mB4]}
                  />
                )}
                name="age"
              />
              <Controller
                control={control}
                rules={{
                  required: 'La lateralidad es obligatoria',
                }}
                render={({field: {onBlur, value}, fieldState: {error}}) => (
                  <Select
                    list={lateralidad}
                    placeholder="Lateralidad *"
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
                    value={gender?.find(s => s.value === value)}
                    name="gender"
                    error={error?.message}
                    onBlur={onBlur}
                    onChange={v =>
                      setValue('gender', v, {shouldValidate: true})
                    }
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
                    list={playerCategories}
                    placeholder="Categoría *"
                    value={playerCategories?.find(s => s.value === value)}
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
