import React, {useState} from 'react';

import {ActivityIndicator, StatusBar, Text, View} from 'react-native';

import {ContainerWithBg} from '../../Components/UI/ContainerWithBg';
import t from '../../Theme/theme';

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {Header} from '../../Components/Layout/Header';
import {Button} from '../../Components/UI/Button';
import {useSyncCoach} from './hooks/useSyncCoach';

export const COACH_CODE_SCREEN_KEY = 'coachCode';

const CELL_COUNT = 5;

export const CoachCode = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {loading, handleSyncCoach} = useSyncCoach();

  const disabled = value.length < 5;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ContainerWithBg
        isBox={false}
        backgroundColor="Gray900"
        opacity={80}
        imageSrc="https://res.cloudinary.com/enalbis/image/upload/v1662929406/PadelPro/varios/bgndlhuj3v1drepvw5uz.webp">
        <SafeAreaView style={[t.flexGrow, t.pX4]}>
          <Header withBack mode="dark" />
          <View style={[t.flexGrow, t.justifyCenter]}>
            <Text
              style={[
                t.fontSansMedium,
                t.text2xl,
                t.textWhite,
                t.mB5,
                t.textCenter,
              ]}>
              CÓDIGO DE ENTRENADOR
            </Text>
            <Text
              style={[
                t.fontSansMedium,
                t.textLg,
                t.textGray500,
                t.textCenter,
                t.pX3,
              ]}>
              Introduce el código que te ha mandado tu entrenador para
              vincularte a su equipo de trabajo
            </Text>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={[t.p5, t.roundedSm]}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  style={[
                    t.w14,
                    t.h14,
                    t.textWhite,
                    t.fontSansBold,
                    t.text2xl,
                    t.border0_5,
                    t.itemsCenter,
                    t.justifyCenter,
                    t.roundedSm,
                    t.borderGray900,
                    {backgroundColor: `${t.bgGray900.backgroundColor}80`},
                    t.textCenter,
                    isFocused && t.borderInfoDark,
                  ]}>
                  <Text
                    key={index}
                    style={[t.textWhite, t.fontSansBold, t.text2xl]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <View style={[t.justifyCenter, t.itemsCenter]}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Button
                  disabled={disabled}
                  title="SINCRONIZAR"
                  style={[t.w40]}
                  onPress={() => {
                    handleSyncCoach(value);
                  }}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </ContainerWithBg>
    </>
  );
};
