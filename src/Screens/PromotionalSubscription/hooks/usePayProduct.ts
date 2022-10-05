import Purchase from 'react-native-purchases';
import {error} from '../../../Lib/Logging';
import {popScreen} from '../../../Router/utils/actions';

export const usePayProduct = () => {
  const makePayment = async purchasePackage => {
    try {
      await Purchase.purchasePackage(purchasePackage);
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
