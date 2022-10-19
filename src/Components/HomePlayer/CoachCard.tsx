import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {ImageBackground, Text, View} from 'react-native';
import t from '../../Theme/theme';
import {Avatar} from '../UI/Avatar';
import {removeMultipleBlanks} from '../../Utils/removeMultipleBlanks';
import {ContainerWithBg} from '../UI/ContainerWithBg';

const BG_IMAGE =
  'https://res.cloudinary.com/enalbis/image/upload/v1648630621/PadelPro/varios/juan-lebron-finales-kUmG--620x349_abc_lmxjgh.jpg';

export const CoachCard = ({coach}) => {
  return (
    <ContainerWithBg
      opacity={80}
      backgroundColor="gray800"
      isBox={true}
      imageSrc={BG_IMAGE}
      style={[t.roundedSm]}>
      <View style={[t.roundedSm, t.justifyCenter, t.itemsCenter, t.p5]}>
        <Avatar
          imageStyle={[t.w24, t.h24, t.border1, t.borderWhite]}
          style={[t.mR4]}
          img={coach?.profileImg}
        />
        <Text style={[t.mT3, t.fontSansMedium, t.textWhite, t.textLg]}>
          {removeMultipleBlanks(`${coach?.firstName} ${coach?.secondName}`)}
        </Text>
      </View>
    </ContainerWithBg>
  );
};
