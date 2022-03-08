import Purchase from 'react-native-purchases';
import {openStack} from '../../../Router/utils/actions';
import {TAB_STACK_KEY} from '../../../Router/utils/routerKeys';
import {ENTITLEMENT_ID} from '../../../Utils/constants';
export const usePayProduct = () => {
  const makePayment = async purchasePackage => {
    const {purchaserInfo} = await Purchase.purchasePackage(purchasePackage);
    if (
      typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
    ) {
      openStack(TAB_STACK_KEY);
    }
  };

  return {
    makePayment,
  };
};
