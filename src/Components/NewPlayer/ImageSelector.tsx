import React, {useEffect, useState} from 'react';

import {View, Text, ImageBackground} from 'react-native';
import t from '../../Theme/theme';
import {BottomModal} from '../Modal/BottomModal';

import {ListItem} from '../UI/ListItem';
import PressableOpacity from '../UI/PressableOpacity';
import {imageActions} from './utils/imageActions';

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
        {imageSource || imageSelected?.assets?.length > 0 ? (
          <PressableOpacity
            onPress={() => setIsVisible(true)}
            style={[t.w28, t.h28]}>
            <ImageBackground
              source={{uri: imageSelected?.assets?.[0].uri || imageSource}}
              style={[t.w28, t.h28]}
              imageStyle={[t.roundedFull]}
            />
          </PressableOpacity>
        ) : (
          <PressableOpacity
            onPress={() => setIsVisible(true)}
            style={[
              t.w28,
              t.h28,
              t.justifyCenter,
              t.itemsCenter,
              t.roundedFull,
              t.bgGray300,
            ]}>
            {!!name && (
              <Text style={[t.fontSansMedium, t.text3xl, t.textGray600]}>
                {name}
              </Text>
            )}
          </PressableOpacity>
        )}
      </View>
    </>
  );
};
