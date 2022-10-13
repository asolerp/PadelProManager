import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {ImageBackground, Text, View} from 'react-native';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {removeMultipleBlanks} from '../../Utils/removeMultipleBlanks';

const BG_IMAGE =
  'https://res.cloudinary.com/enalbis/image/upload/v1648630621/PadelPro/varios/juan-lebron-finales-kUmG--620x349_abc_lmxjgh.jpg';

export const CoachCard = ({coach}) => {
  return (
    <ImageBackground source={{uri: BG_IMAGE}} imageStyle={[t.roundedSm]}>
      <BlurView
        style={[t.roundedSm, t.p5]}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white">
        <View style={[t.justifyCenter, t.itemsCenter]}>
          <Avatar
            imageStyle={[t.w24, t.h24, t.border1, t.borderWhite]}
            style={[t.mR4]}
            img={coach?.profileImg}
          />
          <Text style={[t.mT3, t.fontSansMedium, t.textWhite, t.textLg]}>
            {removeMultipleBlanks(`${coach?.firstName} ${coach?.secondName}`)}
          </Text>
        </View>
      </BlurView>
    </ImageBackground>
  );
};
