import React, {useState} from 'react';
import {Dimensions, ListRenderItem, View, ViewStyle} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';

import t from '../../Theme/theme';

interface DotProps {
  active: Boolean;
  dotColor: ViewStyle;
}

interface PaginatedListProps {
  renderItem: ListRenderItem<any>;
  data: any;
  dotColor: ViewStyle;
}

const Dot: React.FC<DotProps> = ({active, dotColor = t.bgGray900}) => {
  return (
    <View
      style={[
        t.w4,
        t.h4,
        t.mX1,
        t.roundedFull,
        active ? dotColor : t.bgGray300,
      ]}
    />
  );
};

const {width} = Dimensions.get('window');

export const PaginatedList: React.FC<PaginatedListProps> = ({
  dotColor,
  renderItem,
  data,
}) => {
  const [index, setIndex] = useState(0);
  const isActive = i => i === index;

  return (
    <View>
      <Carousel
        loop={false}
        width={width}
        height={220}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setIndex(index)}
        renderItem={renderItem}
      />
      {/* <FlatList
        ref={flatListRef}
        horizontal
        decelerationRate="fast"
        onScroll={event => {
          const totalWidth = event.nativeEvent.layoutMeasurement.width;
          const xPos = event.nativeEvent.contentOffset.x;
          const current = Math.floor(xPos / totalWidth);
          setIndex(current);
        }}
        snapToAlignment="start"
        snapToInterval={Dimensions.get('window').width}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <View style={{width: ITEM_LENGTH}}>
            <View style={{marginHorizontal: SPACING * 2}}>
              {renderItem({item, index})}
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      /> */}
      {data?.length > 1 && (
        <View style={[t.flexRow, t.justifyCenter, t.mT2]}>
          {data.map((_, i) => (
            //   <Pressable key={i} onPress={() => handlePressDot(i)}>
            <Dot key={i} active={isActive(i)} dotColor={dotColor} />
            //   </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};
