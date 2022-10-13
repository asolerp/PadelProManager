import React, {createContext, useEffect, useState} from 'react';
import {openStackWithReplace} from '../Router/utils/actions';
import {LOGIN_PLAYER_SCREEN_KEY} from '../Screens/LoginPlayer/LoginPlayer';

export interface DynamicLinkContextInterface {
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  params: any;
  setParams: React.Dispatch<React.SetStateAction<any>>;
}

export const DynamicLinkContext =
  createContext<DynamicLinkContextInterface | null>(null);

const LINK_TO_NEW_PLAYER = 'new_player';

const getDeepLinkActionMap = () => ({
  [LINK_TO_NEW_PLAYER]: onNewPlayerDeepLink,
});

const onNewPlayerDeepLink = params => {
  console.log('PARAMS LOGIN', params);
  openStackWithReplace(LOGIN_PLAYER_SCREEN_KEY, {
    coachId: params?.coachId,
  });
};

export const DynamicLinkProvider = ({children}) => {
  const [action, setAction] = useState<string>('');
  const [params, setParams] = useState<any>();
  const deepLinkMap = getDeepLinkActionMap();

  useEffect(() => {
    if (action) {
      deepLinkMap[action]?.(params);
    }
  }, [action]);

  const value = {
    action,
    setAction,
    params,
    setParams,
  };
  return (
    <DynamicLinkContext.Provider value={value}>
      {children}
    </DynamicLinkContext.Provider>
  );
};
