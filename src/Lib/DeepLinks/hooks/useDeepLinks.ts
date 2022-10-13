import dynamicLinks from '@react-native-firebase/dynamic-links';
import {useContext, useEffect} from 'react';
import {openScreenWithPush} from '../../../Router/utils/actions';
import {LOGIN_SCREEN_KEY} from '../../../Screens/Login/Login';
import {parse} from 'search-params';
import {DynamicLinkContext} from '../../../Context/DynamicLinkContext';
import {LOGIN_PLAYER_SCREEN_KEY} from '../../../Screens/LoginPlayer/LoginPlayer';

export const useDeepLinks = () => {
  const {setAction, setParams} = useContext(DynamicLinkContext);

  const handleDynamicLink = link => {
    const {action, ...params} = parse(link.url);

    console.log('ACTION', action);
    console.log('PARAMS', params);

    if (!action) {
      return;
    }
    setAction(action);
    setParams({...params});
  };

  useEffect(() => {
    const unsubscribeDeepLinkListeners = dynamicLinks().onLink(link =>
      handleDynamicLink(link),
    );

    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          handleDynamicLink(link);
        }
      })
      .catch(console.warn);

    return () => {
      unsubscribeDeepLinkListeners();
    };
  }, []);
};
