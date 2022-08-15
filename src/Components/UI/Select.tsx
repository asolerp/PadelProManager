import React, {useCallback, useEffect, useState} from 'react';

import {BottomModal} from '../Modal/BottomModal';
import {Input} from './Input';
import {
  Pressable,
  Keyboard,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import t from '../../Theme/theme';
import {HDivider} from './HDivider';
import {Button} from './Button';
import Icon from 'react-native-vector-icons/Ionicons';

export const Select = ({
  empty,
  value,
  label,
  name,
  error,
  onBlur,
  onChange,
  placeholder,
  withScroll = false,
  list,
  style,
  disabled,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [localValue, setLocalValue] = useState();

  const handlePressOption = option => {
    if (option === localValue) {
      return setLocalValue(null);
    }
    setLocalValue(option);
  };

  useEffect(() => {
    if (value) {
      return setLocalValue(value.value);
    }
    setLocalValue(null);
  }, [value]);

  const listOfElements = useCallback(() => {
    return list?.map(element => {
      const isOptionActive = !!localValue && localValue === element.value;
      return (
        <Pressable
          onPress={() => handlePressOption(element.value)}
          style={[isOptionActive && t.bgGray200]}>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.pX6]}>
            <Text
              style={[
                t.textGray700,
                t.fontSans,
                t.textXl,
                t.mY4,
                t.pL4,
                isOptionActive && t.fontSansBold,
              ]}
              key={element.value}>
              {element?.label}
            </Text>
            {isOptionActive && (
              <Icon
                name="ios-checkmark"
                color={'black'}
                size={30}
                style={[t.mL2]}
              />
            )}
          </View>
          <HDivider />
        </Pressable>
      );
    });
  }, [list, localValue, value, handlePressOption]);

  return (
    <Pressable
      style={[style, disabled && t.opacity30]}
      onPress={() => Keyboard.dismiss()}>
      <BottomModal
        swipeDirection={null}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}>
        <>
          {withScroll ? (
            <ScrollView style={{height: Dimensions.get('window').height * 0.7}}>
              {listOfElements()}
            </ScrollView>
          ) : (
            listOfElements()
          )}

          <HDivider />
          <View style={[t.pX4]}>
            <Button
              active
              size="lg"
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
        onPressOut={() => {
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
