import {useEffect} from 'react';
import {Platform} from 'react-native';
import Purchases from 'react-native-purchases';

const IOS_REVCAT_KEY = 'appl_mQZzJiecqvWYNjDWxOICizHNHOO';

export const useIAPayments = () => {
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
      Purchases.setup(IOS_REVCAT_KEY);
    }
  });
};
