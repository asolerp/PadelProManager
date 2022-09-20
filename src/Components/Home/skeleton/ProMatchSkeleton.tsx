import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../../Theme/theme';

export const ProMatchSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[t.flexRow, t.itemsCenter]}>
      <SkeletonPlaceholder.Item
        width={350}
        height={200}
        borderRadius={10}
        marginRight={10}
      />
    </View>
  </SkeletonPlaceholder>
);
