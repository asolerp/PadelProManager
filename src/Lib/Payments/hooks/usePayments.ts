import {useContext, useEffect} from 'react';

import {SubscriptionContext} from '../../../Context/SubscriptionContext';
import Purchases from 'react-native-purchases';
import {ENTITLEMENT_ID} from '../../../Utils/constants';

export const usePayments = () => {
  const {setIsSubscribed, setIsChecking} = useContext(SubscriptionContext);

  const getUserData = async () => {
    setIsChecking(true);
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      console.log(
        typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !==
          'undefined',
      );
      setIsSubscribed(
        typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !==
          'undefined',
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    Purchases.addPurchaserInfoUpdateListener(getUserData);
    return () => {
      Purchases.removePurchaserInfoUpdateListener(getUserData);
    };
  }, []);

  return {
    getUserData,
  };
};
