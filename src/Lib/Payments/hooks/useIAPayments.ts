import {useEffect} from 'react';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import Purchases from 'react-native-purchases';

export const useIAPayments = () => {
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);

    if (Platform.OS === 'ios') {
      Purchases.configure({apiKey: Config.IOS_REVCAT_KEY});
    }
    if (Platform.OS === 'android') {
      Purchases.configure({apiKey: Config.ANDROID_REVCAT_KEY});
    }
  });
};
