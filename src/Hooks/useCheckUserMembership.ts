import {useContext, useEffect} from 'react';
import Purchases from 'react-native-purchases';
import {ENTITLEMENT_ID} from '../Utils/constants';
import {SubscriptionContext} from '../Context/SubscriptionContext';
export const useCheckUserMembership = () => {
  const {setIsSubscribed} = useContext(SubscriptionContext);
  const checkUserMembership = async () => {
    try {
      const purchaserInfo = await Purchases.getPurchaserInfo();
      if (
        typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
      ) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkUserMembership();
    Purchases.addPurchaserInfoUpdateListener(() => {
      checkUserMembership();
    });
  }, []);
};
