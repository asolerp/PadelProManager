import dynamicLinks from '@react-native-firebase/dynamic-links';
import {useContext, useEffect} from 'react';

import {parse} from 'search-params';
import {DynamicLinkContext} from '../../../Context/DynamicLinkContext';

import {Linking} from 'react-native';

export const useDeepLinks = () => {
  const {setAction, setParams} = useContext(DynamicLinkContext);

  const handleDynamicLink = link => {
    const {action, ...params} = parse(link.url);

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
        } else {
          Linking.getInitialURL()
            .then(initialUrl => {
              if (initialUrl) {
                dynamicLinks()
                  .resolveLink(initialUrl)
                  .then(resolvedLink => {
                    handleDynamicLink(resolvedLink);
                  })
                  .catch(console.warn);
              }
            })
            .catch(console.warn);
        }
      })
      .catch(console.warn);

    return () => {
      unsubscribeDeepLinkListeners();
    };
  }, []);
};
