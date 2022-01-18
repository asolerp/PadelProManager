import React, {useState} from 'react';

import {Platform, Text, View} from 'react-native';
import {Header} from '../../Components/Layout/Header';
import {ScreenLayout} from '../../Components/Layout/ScreenLayout';
import {Input} from '../../Components/UI/Input';
import t from '../../Theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const NEW_MATCH_SCREEN_KEY = 'newMatchScreen';

export const NewMatchScreen = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <ScreenLayout>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Header withBack title="Nuevo partido" />
      <View style={[t.flexGrow, t.mT5]}>
        <Input onFocus={() => showDatePicker()} label="Fecha del partido" />
      </View>
    </ScreenLayout>
  );
};
