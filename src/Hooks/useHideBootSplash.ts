import {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

export const useHideBootSplash = () => {
  useEffect(() => {
    setTimeout(async () => {
      await RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);
};
