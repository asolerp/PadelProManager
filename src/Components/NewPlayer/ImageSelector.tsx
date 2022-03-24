import React, {useEffect, useState} from 'react';

import {View, Text, ImageBackground} from 'react-native';
import t from '../../Theme/theme';
import {BottomModal} from '../Modal/BottomModal';

import {ListItem} from '../UI/ListItem';
import PressableOpacity from '../UI/PressableOpacity';
import {imageActions} from './utils/imageActions';
import Icon from 'react-native-vector-icons/Ionicons';

const CAPTURE_ACTION = 'capture';
const LIBRARY_ACTION = 'library';

export const ImageSelector = ({
  name,
  onImagePress,
  imageSelected,
  imageSource,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, [imageSelected]);

  const handlePress = type => {
    onImagePress({
      type,
      options: imageActions[type],
    });
  };
  return (
    <>
      <BottomModal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <View style={[t.mB3]}>
          <ListItem
            iconName="ios-camera"
            title="Usar cámara"
            onPress={() => handlePress(CAPTURE_ACTION)}
          />
          <ListItem
            iconName="ios-folder"
            title="Acceder a fotos"
            onPress={() => handlePress(LIBRARY_ACTION)}
          />
        </View>
      </BottomModal>
      <View style={[t.mB10, t.itemsCenter]}>
        <PressableOpacity onPress={() => setIsVisible(true)}>
          {imageSource || imageSelected?.assets?.length > 0 ? (
            <ImageBackground
              source={{uri: imageSelected?.assets?.[0].uri || imageSource}}
              style={[t.w36, t.h36]}
              imageStyle={[t.roundedFull]}
            />
          ) : (
            <View
              style={[
                t.w36,
                t.h36,
                t.justifyCenter,
                t.itemsCenter,
                t.roundedFull,
                t.bgGray300,
              ]}>
              {name ? (
                <Text style={[t.fontSansMedium, t.text3xl, t.textGray600]}>
                  {name}
                </Text>
              ) : (
                <View
                  style={[
                    t.p2,
                    t.z10,
                    t.roundedFull,
                    t.bgGray900,
                    t.itemsCenter,
                    t.justifyCenter,
                  ]}>
                  <Icon name="ios-camera" size={35} color="white" />
                </View>
              )}
            </View>
          )}
        </PressableOpacity>
      </View>
    </>
  );
};
