import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

import {BottomModal} from '../Modal/BottomModal';
import {Input} from './Input';
import {Pressable, Keyboard, View} from 'react-native';
import t from '../../Theme/theme';
import {HDivider} from './HDivider';
import {Button} from './Button';

export const Select = ({
  empty,
  value,
  label,
  name,
  error,
  onBlur,
  onChange,
  placeholder,
  list,
  style,
  disabled,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [localValue, setLocalValue] = useState();

  return (
    <Pressable
      style={[style, disabled && t.opacity30]}
      onPress={() => Keyboard.dismiss()}>
      <BottomModal
        title={label}
        swipeDirection={null}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}>
        <>
          <Picker
            selectedValue={localValue}
            onValueChange={(itemValue, itemIndex) => setLocalValue(itemValue)}>
            {list?.map(element => (
              <Picker.Item
                key={element.value}
                label={element?.label}
                value={element.value}
              />
            ))}
          </Picker>
          <HDivider />
          <View style={[t.pX4]}>
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
          </View>
        </>
      </BottomModal>

      <Input
        empty={empty}
        editable={false}
        placeholder={placeholder}
        value={value?.label}
        name={name}
        error={error}
        onPressIn={() => {
          Keyboard.dismiss();
          !disabled && setIsVisible(true);
        }}
        onBlur={onBlur}
        label={label}
        style={[t.flex2]}
      />
    </Pressable>
  );
};
