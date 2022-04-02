import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import t from '../../Theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomModal} from '../Modal/BottomModal';
import {Picker} from '@react-native-picker/picker';
import {HDivider} from './HDivider';
import {Button} from './Button';
import {searchOptions} from '../../Utils/lists';
import PressableOpacity from './PressableOpacity';

interface Props extends TextInputProps {
  style?: ViewStyle[];
  inputStyle?: TextStyle[];
  error?: string;
  defaultOption: string;
  list?: any;
  onChange?: () => string;
}

export const SearchInput: React.FC<Props> = ({
  list,
  style,
  error,
  onChange,
  inputStyle,
  defaultOption,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState<boolean>();
  const [localValue, setLocalValue] = useState(defaultOption);

  return (
    <>
      <BottomModal
        swipeDirection={null}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}>
        <>
          {list && (
            <Text style={[t.fontSansBold, t.text2xl, t.textCenter]}>
              Buscar por...
            </Text>
          )}
          <Picker
            selectedValue={localValue}
            onValueChange={itemValue => setLocalValue(itemValue)}>
            {list?.map(element => (
              <Picker.Item
                key={element.value}
                label={element?.label}
                value={element.value}
              />
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
      <View style={[style]}>
        <View
          style={[
            t.flexRow,
            t.border,
            t.justifyStart,
            t.itemsCenter,
            t.pX4,
            t.pY4,
            t.roundedSm,
            error ? t.borderErrorDark : t.borderGray400,
          ]}>
          {list && (
            <PressableOpacity
              onPress={() => setIsVisible(true)}
              style={[t.mR3]}>
              <Icon name="ios-chevron-down" size={20} />
            </PressableOpacity>
          )}
          <TextInput
            placeholder={`Buscar por ${searchOptions
              ?.find(s => s.value === localValue)
              ?.label.toLowerCase()}`}
            placeholderTextColor="#718096"
            style={[t.fontSans, t.textBase, inputStyle]}
            {...props}
          />
        </View>
        {error && (
          <Text style={[t.fontSansMedium, t.textError, t.mT1]}>{error}</Text>
        )}
      </View>
    </>
  );
};
