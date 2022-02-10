import Purchase from 'react-native-purchases';
import {popScreen} from '../../../Router/utils/actions';
import {ENTITLEMENT_ID} from '../../../Utils/constants';
export const usePayProduct = () => {
  const makePayment = async purchasePackage => {
    const {purchaserInfo} = await Purchase.purchasePackage(purchasePackage);
    if (
      typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
    ) {
      popScreen();
    }
  };

  return {
    makePayment,
  };
};
