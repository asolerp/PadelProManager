import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import {openScreenWithPush} from '../Router/utils/actions';
import {CHAT_SCREEN_KEY} from '../Screens/Chat/Chat';

export const useNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {});
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        if (remoteMessage) {
        }
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    requestUserPermission();
    return () => {
      requestUserPermission();
    };
  }, []);
};

export const useRedirectNotification = () => {
  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        const {data} = remoteMessage;
        openScreenWithPush(CHAT_SCREEN_KEY, {
          conversationId: data?.docId,
        });
      }
    });
  }, []);
};
