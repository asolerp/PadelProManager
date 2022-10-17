import React, {useCallback} from 'react';
import {ActivityIndicator} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';
import {Day} from '../../Components/Chat/Day';
import {Send} from '../../Components/Chat/Send';
import {Time} from '../../Components/Chat/Time';
import {Header, ScreenLayout} from '../../Components/Layout';

import {HDivider} from '../../Components/UI/HDivider';
import {Spacer} from '../../Components/UI/Spacer';
import {useFirebaseAuth} from '../../Context/FirebaseContext';
import t from '../../Theme/theme';

import {useChat} from './hooks/useChat';

export const CHAT_SCREEN_KEY = 'chatScreen';

export const Chat = ({route}) => {
  const conversationId = route?.params?.conversationId;
  const chatTitle = route?.params?.chatTitle;
  const chatSubtitle = route?.params?.chatSubtitle;

  const {user} = useFirebaseAuth();

  const {saveMessage, messages, chatTitleFromDB} = useChat({
    conversationId,
    chatTitle,
  });

  const onSend = useCallback((messages = []) => {
    saveMessage(messages);
  }, []);

  return (
    <ScreenLayout style={[t.bgWhite]}>
      <Header
        title={chatTitle || chatTitleFromDB}
        subtitle={chatSubtitle}
        withBack
      />
      <HDivider />
      <GiftedChat
        messages={messages}
        showUserAvatar
        wrapInSafeArea={false}
        placeholder="Nuevo mensaje..."
        onSend={messages => onSend(messages)}
        renderLoading={() => <ActivityIndicator />}
        renderDay={props => <Day {...props} />}
        renderSend={props => <Send {...props} />}
        renderTime={props => <Time {...props} />}
        user={{
          _id: user?.email,
          name: user?.firstName,
          avatar: user?.profileImg,
        }}
      />
      <Spacer space={5} />
    </ScreenLayout>
  );
};
