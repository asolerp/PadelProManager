import {useIAP} from 'react-native-iap';

import {useCallback, useContext, useEffect} from 'react';
import {Platform} from 'react-native';
import {SubscriptionContext} from '../../../Context/SubscriptionContext';

const itemSkus = Platform.select({
  ios: ['com.padelpro.499.1m'],
  android: [],
});

export const usePayments = () => {
  const {setIsExpired, setOldPurchases, setIsChecking} =
    useContext(SubscriptionContext);

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
  }, [connected, getSubscriptions, getPurchaseHistories, setIsChecking]);

  const validateReceipt = useCallback(
    async receipt => {
      const receiptBody = {
        'receipt-data': receipt,
        password: 'b9c74702d40b423a9b1f6e3d6d457c22',
      };
      setIsChecking(true);
      try {
        const deliveryReceipt = await fetch(
          'https://us-central1-padel-manager-pro.cloudfunctions.net/validateReceipt',
          {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({data: receiptBody}),
          },
        );
        const responseJson = await deliveryReceipt.json();
        console.log(responseJson);
        setIsExpired(responseJson?.result?.isExpired);
      } catch (err) {
        console.log(err);
      } finally {
        setIsChecking(false);
      }
    },
    [setIsExpired, setIsChecking],
  );

  useEffect(() => {
    console.log('CHECK OLD PURCHASES');
    if (purchaseHistories?.length > 0) {
      setOldPurchases(true);
      const receipt =
        purchaseHistories?.[purchaseHistories.length - 1]?.transactionReceipt;
      if (receipt) {
        validateReceipt(receipt);
      }
    } else {
      setOldPurchases(false);
    }
  }, [purchaseHistories, setIsExpired, setOldPurchases, validateReceipt]);

  useEffect(() => {
    console.log('NEW PURCHASE');
    const checkCurrentPurchase = async purchase => {
      try {
        if (purchase) {
          const receipt = purchase.transactionReceipt;
          console.log('[[RECEIPT]]', receipt);
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
