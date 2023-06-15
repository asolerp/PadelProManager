import {useEffect, useState} from 'react';
import Purchases from 'react-native-purchases';
import {error} from '../../../Lib/Logging';

export const useGetProducts = () => {
  const [packages, setPackages] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPackages = async () => {
      setLoading(true);
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          console.log('OFFERINGS', offerings.current);
          setPackages(offerings.current.availablePackages);
        }
      } catch (err) {
        console.log(err);
        error({
          title: 'Subscripción',
          subtitle: 'No se han podido recuperar los productos',
          data: {
            error: err.userInfo.readableErrorCode,
          },
        });
      } finally {
        setLoading(false);
      }
    };

    getPackages();
  }, []);

  return {
    loading,
    packages,
  };
};
