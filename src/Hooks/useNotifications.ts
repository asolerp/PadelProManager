import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

export const useNotification = () => {
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
        console.log('REMOTE MESSAGE', remoteMessage);
      }
    });
  }, []);
};
