import {useEffect, useState} from 'react';
import Purchases from 'react-native-purchases';

export const useGetProducts = () => {
  const [packages, setPackages] = useState<any>();

  useEffect(() => {
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getPackages();
  }, []);

  return {
    packages,
  };
};
