import {format} from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import React from 'react';
import {ImageBackground, Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import t from '../../Theme/theme';

import {parseRound} from '../../Utils/parsers';

import {ResultPro} from '../PadelPro/ResultPro';
import PressableOpacity from '../UI/PressableOpacity';

export const ProMatchCard = ({match, onPress}) => {
  return (
    <PressableOpacity style={[t.wFull, t.hFull, t.pX4]} onPress={onPress}>
      <ImageBackground
        resizeMode="cover"
        style={[t.wFull, t.hFull, t.itemsCenter, t.shadow, t.relative]}
        imageStyle={[t.roundedSm]}
        source={{
          uri:
            match?.category !== -1
              ? 'https://res.cloudinary.com/enalbis/image/upload/v1666683667/PadelPro/varios/qx0n0xokjfivjub92jcz.jpg'
              : 'https://res.cloudinary.com/enalbis/image/upload/v1662134698/PadelPro/varios/mia8e5e2lx6l3vwpa3be.jpg',
        }}>
        <View style={[t.wFull, t.hFull, t.itemsCenter, t.p2]}>
          <View
            style={[
              t.absolute,
              t.left2,
              t.top2,
              match?.category === -1 && t.bgWhite,
              t.roundedSm,
            ]}>
            <View style={[t.p1]}>
              <FastImage
                style={[t.w6, t.h6, t.z50]}
                source={{
                  uri:
                    match?.category === -1
                      ? 'https://res.cloudinary.com/enalbis/image/upload/v1666768912/PadelPro/varios/tqlxyihmmf3nuhrspsmm.png'
                      : 'https://res.cloudinary.com/enalbis/image/upload/v1659089151/PadelPro/varios/z2rdilusv7x45rlnhbuj.png',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
          <View style={[t.flex1]}>
            {!!match?.tournamentName && (
              <View style={[t.flexGrow]}>
                <Text
                  numberOfLines={2}
                  style={[
                    t.w60,
                    t.fontSansBold,
                    t.textWhite,
                    t.textXl,
                    t.textCenter,
                  ]}>
                  {match?.tournamentName.toUpperCase()}
                </Text>
              </View>
            )}
            {!!match?.club && !match?.tournamentName && (
              <View style={[t.flexGrow]}>
                <Text
                  numberOfLines={2}
                  style={[
                    t.w60,
                    t.fontSansBold,
                    t.textWhite,
                    t.textLg,
                    t.textCenter,
                  ]}>
                  {match?.club.toUpperCase()}
                </Text>
              </View>
            )}
            <View style={[t.flexRow, t.itemsStart, t.justifyCenter, t.mY7]}>
              <Text style={[t.textWhite, t.fontSansMedium]}>
                {format(match?.date?.toDate(), 'LLL d')}{' '}
              </Text>
              {match?.round ? (
                <Text style={[t.textWhite, t.fontSansMedium]}>
                  | {parseRound[match?.round]}
                </Text>
              ) : (
                <></>
              )}
            </View>
          </View>
          <ResultPro
            round={match?.round}
            mode="small"
            game={match.game}
            t1={match.t1}
            t2={match.t2}
          />
        </View>
      </ImageBackground>
    </PressableOpacity>
  );
};
