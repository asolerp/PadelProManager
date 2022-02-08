import {useIAP} from 'react-native-iap';

import {useContext, useEffect} from 'react';
import {Platform} from 'react-native';
import {SubscriptionContext} from '../../../Context/SubscriptionContext';
import {useValidateReceipt} from './useValidateReceipt';

const itemSkus = Platform.select({
  ios: ['com.padelpro.499.1m'],
  android: [],
});

export const usePayments = () => {
  const {setIsChecking} = useContext(SubscriptionContext);

  const {validateReceipt} = useValidateReceipt();

  const {
    connected,
    currentPurchase,
    getSubscriptions,
    purchaseHistories,
    getPurchaseHistories,
  } = useIAP();

  useEffect(() => {
    const getPaymentsInfo = async () => {
      try {
        await getSubscriptions(itemSkus);
        await getPurchaseHistories();
      } catch (err) {
        console.log(err);
      } finally {
        setIsChecking(false);
      }
    };
    if (connected) {
      getPaymentsInfo();
    }
  }, [connected]);

  useEffect(() => {
    if (purchaseHistories?.length > 0) {
      const receipt =
        purchaseHistories?.[purchaseHistories.length - 1]?.transactionReceipt;
      if (receipt) {
        validateReceipt(receipt);
      }
    } else {
    }
  }, [purchaseHistories]);

  useEffect(() => {
    const checkCurrentPurchase = async purchase => {
      try {
        if (purchase) {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            validateReceipt(receipt);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkCurrentPurchase(currentPurchase);
  }, [currentPurchase]);
};
