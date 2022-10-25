import Purchase from 'react-native-purchases';
import {error} from '../../../Lib/Logging';
import {popScreen} from '../../../Router/utils/actions';
import {ENTITLEMENT_ID} from '../../../Utils/constants';

export const usePayProduct = () => {
  const makePayment = async purchasePackage => {
    try {
      const {purchaserInfo} = await Purchase.purchasePackage(purchasePackage);
      if (
        typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined'
      ) {
        console.log('USER IS PRO');
      }
      popScreen();
    } catch (err) {
      if (err.userInfo.readableErrorCode !== 'PURCHASE_CANCELLED') {
        error({
          title: 'Subscripción',
          subtitle: 'No se ha podido realizar el pago',
          data: {
            error: err.userInfo.readableErrorCode,
          },
        });
      }
    }
  };

  const handleMakePayment = async purchasePackage => {
    console.log('PACKAGE', purchasePackage);
    try {
      await makePayment(purchasePackage);
    } catch (err) {
      error({
        title: 'Subscripción',
        subtitle: 'Algo ha ocurrido al realizar el pago',
        data: {
          error: err.userInfo.readableErrorCode,
        },
      });
    }
  };

  return {
    handleMakePayment,
  };
};
