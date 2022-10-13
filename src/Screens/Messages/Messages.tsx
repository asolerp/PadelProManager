import {useFocusEffect} from '@react-navigation/native';
import {format} from 'date-fns';
import React from 'react';
import {useCallback} from 'react';
import {useContext} from 'react';
import {ActivityIndicator, RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {Header, ScreenLayout} from '../../Components/Layout';
import {Avatar} from '../../Components/UI/Avatar';
import {HDivider} from '../../Components/UI/HDivider';
import PressableOpacity from '../../Components/UI/PressableOpacity';
import {AuthContext} from '../../Context/AuthContex';
import {openScreenWithPush} from '../../Router/utils/actions';
import t from '../../Theme/theme';
import {CHAT_SCREEN_KEY} from '../Chat/Chat';
import {useGetConversations} from './hooks/useGetConversations';

export const MESSAGES_SCREEN_KEY = 'messagesScreen';

export const Messages = () => {
  const {isCoach, user} = useContext(AuthContext);
  const {conversations, loading, refetch} = useGetConversations();

  useFocusEffect(
    useCallback(() => {
      const refetching = refetch();
      return () => refetching;
    }, []),
  );

  const ItemHeader = ({item}) => {
    const avatarUrl =
      item.type === 2
        ? item?.group?.groupImage
        : isCoach
        ? item?.player?.profileImg
        : item?.coach?.profileImg;
    return (
      <>
        <Avatar img={avatarUrl} imageStyle={[t.w10, t.h10]} />
        <View style={[t.mL3]}>
          <Text>
            {item.type === 2
              ? `${item?.group?.groupName}`
              : isCoach
              ? `${item?.player?.firstName} ${item?.player?.secondName}`
              : `${item?.coach?.firstName} ${item?.coach?.secondName}`}
          </Text>
          {item?.lastMessage && (
            <Text style={[t.w60, t.fontSans, t.textXs, t.textGray600]}>
              {item?.lastMessage?.text.length > 25
                ? item?.lastMessage?.text.substring(0, 25 - 3) + '...'
                : item?.lastMessage?.text}
            </Text>
          )}
        </View>
      </>
    );
  };

  const renderItem = ({item}) => {
    const chatSubtitle =
      item?.groupId &&
      item?.members
        .map(p => p.firstName)
        .join()
        .split(',')
        .join(', ');

    return (
      <PressableOpacity
        onPress={() =>
          openScreenWithPush(CHAT_SCREEN_KEY, {
            conversationId: item?.id,
            chatTitle: item?.groupId
              ? item?.group?.groupName
              : isCoach
              ? `${item?.player?.firstName} ${item?.player?.secondName}`
              : `${item?.coach?.firstName} ${item?.coach?.secondName}`,
            chatSubtitle,
          })
        }
        style={[t.p2, t.flexRow, t.justifyStart, t.itemsCenter]}>
        <ItemHeader item={item} />
        <View style={[t.flexGrow, t.itemsEnd]}>
          {item?.lastMessage && (
            <Text style={[t.fontSans, t.textXs, t.textGray600]}>
              {format(item?.lastMessage?.createdAt?._seconds * 1000, 'HH:mm')}
            </Text>
          )}
          {item.lastMessage && !item?.lastMessage?.readBy?.[user?.email] && (
            <View style={[t.w3, t.h3, t.roundedFull, t.bgErrorDark, t.mT1]} />
          )}
        </View>
      </PressableOpacity>
    );
  };

  return (
    <ScreenLayout>
      <Header title="Mensajes" withBack={isCoach} />
      <HDivider />
      {loading ? (
        <View style={[t.flexGrow, t.justifyCenter, t.itemsCenter]}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={conversations}
          ListEmptyComponent={() => (
            <View style={[t.p4, t.flexGrow, t.justifyCenter, t.itemsCenter]}>
              <Text style={[t.fontSans, t.textLg, t.textCenter]}>
                No tienes ningún mensaje nuevo
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <HDivider />}
        />
      )}
    </ScreenLayout>
  );
};
