import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {Dimensions, View} from 'react-native';
import t from '../../Theme/theme';

export const PlayersSkeleton = () => (
  <SkeletonPlaceholder>
    <View style={[t.itemsCenter, t.pX4, t.mT7]}>
      <SkeletonPlaceholder.Item
        width={Dimensions.get('window').width - 30}
        height={40}
        borderRadius={10}
        marginBottom={10}
      />
      <SkeletonPlaceholder.Item
        width={Dimensions.get('window').width - 30}
        height={40}
        borderRadius={10}
        marginBottom={10}
      />
      <SkeletonPlaceholder.Item
        width={Dimensions.get('window').width - 30}
        height={40}
        borderRadius={10}
        marginBottom={10}
      />
      <SkeletonPlaceholder.Item
        width={Dimensions.get('window').width - 30}
        height={40}
        borderRadius={10}
        marginBottom={10}
      />
    </View>
  </SkeletonPlaceholder>
);
