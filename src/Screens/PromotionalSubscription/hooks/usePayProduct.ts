import Purchase from 'react-native-purchases';
import {openStack} from '../../../Router/utils/actions';
import {TAB_STACK_KEY} from '../../../Router/utils/routerKeys';
import {ENTITLEMENT_ID} from '../../../Utils/constants';

export const usePayProduct = () => {
  const makePayment = async purchasePackage => {
    try {
      const {purchaserInfo} = await Purchase.purchasePackage(purchasePackage);
      if (
        typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
      ) {
        openStack(TAB_STACK_KEY);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMakePayment = async purchasePackage => {
    try {
      await makePayment(purchasePackage);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleMakePayment,
  };
};
