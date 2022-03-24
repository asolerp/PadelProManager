import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {View} from 'react-native';
import t from '../../Theme/theme';

export const AvatarSkeleton = () => (
  <>
    <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
    <SkeletonPlaceholder.Item
      marginTop={5}
      width={35}
      height={8}
      borderRadius={8}
    />
  </>
);
