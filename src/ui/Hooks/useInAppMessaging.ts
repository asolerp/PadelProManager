import inAppMessaging from '@react-native-firebase/in-app-messaging';
import {useEffect} from 'react';
import {initInAppMessaging} from '../Lib/InAppMessaging';

export const useInAppMessaging = () => {
  useEffect(() => {
    if (inAppMessaging().isMessagesDisplaySuppressed) {
      initInAppMessaging();
    }
  }, []);
};
