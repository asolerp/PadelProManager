import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../../Theme/theme';

export const MatchInfoSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[t.mT2, t.mB3, t.flexRow, t.itemsCenter, t.justifyBetween]}>
      <View style={[t.mX2, t.justifyCenter, t.itemsCenter]}>
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={90}
          height={14}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={90}
          height={8}
          borderRadius={4}
        />
      </View>
      <View style={[t.justifyCenter, t.mX4]}>
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={90}
          height={14}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={90}
          height={8}
          borderRadius={4}
        />
      </View>
      <View style={[t.mX2, t.justifyCenter, t.itemsCenter]}>
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={90}
          height={14}
          borderRadius={4}
        />
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={90}
          height={8}
          borderRadius={4}
        />
      </View>
    </View>
  </SkeletonPlaceholder>
);
