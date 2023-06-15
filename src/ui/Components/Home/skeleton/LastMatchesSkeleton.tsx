import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../../Theme/theme';

export const LastMatchesSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
      <View style={[t.flexRow, t.itemsCenter]}>
        <SkeletonPlaceholder.Item
          width={60}
          height={40}
          borderRadius={10}
          marginRight={10}
        />
        <View>
          <SkeletonPlaceholder.Item
            width={50}
            height={10}
            borderRadius={10}
            marginBottom={5}
          />
          <SkeletonPlaceholder.Item width={50} height={10} borderRadius={10} />
        </View>
      </View>
      <View>
        <SkeletonPlaceholder.Item
          width={60}
          height={20}
          borderRadius={10}
          marginRight={10}
        />
      </View>
    </View>
  </SkeletonPlaceholder>
);
