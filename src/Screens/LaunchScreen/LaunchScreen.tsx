import React, {useState, useEffect, useContext} from 'react';
import {SubscriptionContext} from '../../Context/SubscriptionContext';
import {HomeScreen} from '../Home/Home';
import {LoadingPage} from '../LoadingPage/LoadingPage';

export const LAUNCH_SCREEN_KEY = 'launchScreen';
export const LaunchScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const {isChecking} = useContext(SubscriptionContext);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  if (isChecking || !loaded) {
    return <LoadingPage />;
  }

  return <HomeScreen />;
};
