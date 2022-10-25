import {useEffect} from 'react';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import Purchases from 'react-native-purchases';

console.log('ANDROID', Config.ANDROID_REVCAT_KEY);

export const useIAPayments = () => {
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
      Purchases.setup(Config.IOS_REVCAT_KEY);
    }
    if (Platform.OS === 'android') {
      Purchases.setup(Config.ANDROID_REVCAT_KEY);
    }
  });
};
