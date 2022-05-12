import Purchase from 'react-native-purchases';
import {error} from '../../../Lib/Logging';

export const usePayProduct = () => {
  const makePayment = async purchasePackage => {
    try {
      await Purchase.purchasePackage(purchasePackage);
    } catch (err) {
      console.log(err.userInfo.readableErrorCode);
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
