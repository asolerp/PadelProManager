import Purchase from 'react-native-purchases';
import {useCheckUserMembership} from '../../../Hooks/useCheckUserMembership';
import {error} from '../../../Lib/Logging';
import {popScreen} from '../../../Router/utils/actions';

export const usePayProduct = () => {
  const {checkUserMembership} = useCheckUserMembership();
  const makePayment = async purchasePackage => {
    try {
      await Purchase.purchasePackage(purchasePackage);
      await checkUserMembership();
      await popScreen();
    } catch (err) {
      console.log(err);
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
