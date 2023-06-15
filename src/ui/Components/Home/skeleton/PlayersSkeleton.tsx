import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../../Theme/theme';

export const PlayersSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[t.flexRow, t.itemsCenter]}>
      <SkeletonPlaceholder.Item
        width={70}
        height={70}
        borderRadius={70}
        marginRight={10}
      />
      <SkeletonPlaceholder.Item
        width={70}
        height={70}
        borderRadius={70}
        marginRight={10}
      />
      <SkeletonPlaceholder.Item
        width={70}
        height={70}
        borderRadius={70}
        marginRight={10}
      />
      <SkeletonPlaceholder.Item
        width={70}
        height={70}
        borderRadius={70}
        marginRight={10}
      />
      <SkeletonPlaceholder.Item
        width={70}
        height={70}
        borderRadius={70}
        marginRight={10}
      />
    </View>
  </SkeletonPlaceholder>
);
