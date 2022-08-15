import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../../Theme/theme';

export const DailyExerciseSkeleton = () => (
  <View style={[t.mB4]}>
    <SkeletonPlaceholder>
      <View style={[t.flexRow, t.justifyAround]}>
        <View style={[t.flexCol, t.justifyStart]}>
          <SkeletonPlaceholder.Item
            width={150}
            height={20}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={150}
            height={20}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={150}
            height={20}
            borderRadius={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width={150}
            height={80}
            borderRadius={10}
            marginTop={10}
          />
        </View>
        <View>
          <SkeletonPlaceholder.Item
            width={150}
            height={180}
            borderRadius={10}
            marginRight={10}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  </View>
);
