import {useEffect} from 'react';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import Purchases from 'react-native-purchases';
import {isFeatureEnabled, REGISTRY} from '../../FeatureToggle';

export const useIAPayments = () => {
  useEffect(() => {
    if (isFeatureEnabled(REGISTRY.FEATURE_SUBSCRIPTIONS)) {
      Purchases.setDebugLogsEnabled(true);
      if (Platform.OS === 'ios') {
        Purchases.configure({apiKey: Config.IOS_REVCAT_KEY});
      }
      if (Platform.OS === 'android') {
        Purchases.configure({apiKey: Config.ANDROID_REVCAT_KEY});
      }
    }
  }, []);
};
