import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../../Theme/theme';

export const MatchHeaderSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[t.flexRow, t.itemsCenter, t.justifyCenter]}>
      <View style={[t.flexRow]}>
        <View style={[t.mX2, t.justifyCenter, t.itemsCenter]}>
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item
            marginTop={5}
            width={35}
            height={8}
            borderRadius={8}
          />
        </View>
        <View style={[t.mX2, t.justifyCenter, t.itemsCenter]}>
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item
            marginTop={5}
            width={35}
            height={8}
            borderRadius={8}
          />
        </View>
      </View>
      <View style={[t.justifyCenter, t.mX4]}>
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={35}
          height={8}
          borderRadius={8}
        />
        <SkeletonPlaceholder.Item
          marginTop={5}
          width={35}
          height={8}
          borderRadius={8}
        />
      </View>
      <View style={[t.flexRow]}>
        <View style={[t.mX2, t.justifyCenter, t.itemsCenter]}>
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item
            marginTop={5}
            width={35}
            height={8}
            borderRadius={8}
          />
        </View>
        <View style={[t.mX2, t.justifyCenter, t.itemsCenter]}>
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item
            marginTop={5}
            width={35}
            height={8}
            borderRadius={8}
          />
        </View>
      </View>
    </View>
  </SkeletonPlaceholder>
);
