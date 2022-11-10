import {useCallback, useContext, useEffect} from 'react';
import Purchases from 'react-native-purchases';
import {ENTITLEMENT_ID} from '../Utils/constants';
import {SubscriptionContext} from '../Context/SubscriptionContext';
import {timeout} from '../Utils/timeout';
export const useCheckUserMembership = () => {
  const {setIsSubscribed, setIsChecking} = useContext(SubscriptionContext);
  const checkUserMembership = useCallback(async () => {
    console.log('CHECKING MEMBERSHIP');
    setIsChecking(true);
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      console.log('PURCHASE INFO', customerInfo.entitlements);
      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !==
          'undefined' ||
        customerInfo.entitlements.all[ENTITLEMENT_ID].isSandbox === true
      ) {
        console.log('IS SUBSCRIBED');
        setIsSubscribed(true);
      } else {
        console.log('IS NOT SUBSCRIBED');
        setIsSubscribed(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      await timeout(2000);
      setIsChecking(false);
    }
  }, [setIsChecking, setIsSubscribed]);

  useEffect(() => {
    const paymentsSubscriber = Purchases.addCustomerInfoUpdateListener(() => {
      checkUserMembership();
    });
    return paymentsSubscriber;
  }, []);
};
