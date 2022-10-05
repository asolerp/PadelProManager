import React, {useRef, useState} from 'react';
import {Dimensions, ListRenderItem, Pressable, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import t from '../../Theme/theme';

interface DotProps {
  active: Boolean;
}

interface PaginatedListProps {
  renderItem: ListRenderItem<any>;
  data: any;
}

const Dot: React.FC<DotProps> = ({active}) => {
  return (
    <View
      style={[
        t.w4,
        t.h4,
        t.mX1,
        t.roundedFull,
        active ? t.bgInfoLight : t.bgGray300,
      ]}
    />
  );
};

export const PaginatedList: React.FC<PaginatedListProps> = ({
  renderItem,
  data,
}) => {
  const flatListRef = useRef();
  const [index, setIndex] = useState(0);
  const isActive = i => i === index;

  const handlePressDot = index => {
    // console.log(
    //   flatListRef.current.scrollToOffset({
    //     offset: (Dimensions.get('window').width - 36) * index,
    //   }),
    // );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        ItemSeparatorComponent={() => <View style={[t.mX1]} />}
        decelerationRate="fast"
        onScroll={event => {
          const totalWidth = event.nativeEvent.layoutMeasurement.width;
          const xPos = event.nativeEvent.contentOffset.x;
          const current = Math.floor(xPos / totalWidth);
          setIndex(current);
        }}
        snapToInterval={Dimensions.get('window').width - 32}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {data.length > 1 && (
        <View style={[t.flexRow, t.justifyCenter, t.mT2]}>
          {data.map((_, i) => (
            //   <Pressable key={i} onPress={() => handlePressDot(i)}>
            <Dot key={i} active={isActive(i)} />
            //   </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};
