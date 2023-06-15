import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../../Theme/theme';

export const LiveMatchesSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[t.flexRow, t.itemsCenter]}>
      <SkeletonPlaceholder.Item
        width={300}
        height={180}
        borderRadius={10}
        marginRight={10}
      />
      <SkeletonPlaceholder.Item
        width={300}
        height={180}
        borderRadius={10}
        marginRight={10}
      />
    </View>
  </SkeletonPlaceholder>
);
