import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

import {BottomModal} from '../Modal/BottomModal';
import {Input} from './Input';
import {Text, View} from 'react-native';
import t from '../../Theme/theme';
import {HDivider} from './HDivider';
import {Button} from './Button';

export const Select = ({
  value,
  label,
  name,
  error,
  onBlur,
  onChange,
  placeholder,
  list,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [localValue, setLocalValue] = useState();

  return (
    <View style={[style]}>
      <BottomModal
        swipeDirection={null}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}>
        <>
          <Text style={[t.fontSansBold, t.text2xl, t.textCenter]}>{label}</Text>
          <Picker
            selectedValue={localValue}
            onValueChange={(itemValue, itemIndex) => setLocalValue(itemValue)}>
            {list?.map(element => (
              <Picker.Item label={element?.label} value={element.value} />
            ))}
          </Picker>
          <HDivider />
          <Button
            active
            title="Guardar"
            style={[t.mT3, t.mB3]}
            textStyle={[t.textLg]}
            onPress={() => {
              onChange(localValue);
              setIsVisible(false);
            }}
          />
        </>
      </BottomModal>
      <Input
        editable={false}
        placeholder={placeholder}
        value={value?.label}
        name={name}
        error={error}
        onPressIn={() => setIsVisible(true)}
        onBlur={onBlur}
        label={label}
        style={[t.flex2, t.mR3]}
      />
    </View>
  );
};
