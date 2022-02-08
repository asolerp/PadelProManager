import {useContext} from 'react';
import {PremiumModalContext} from '../Context/PremiumModalContext';
import {LIMIT_PLAYERS} from '../Utils/permissionsErrors';
import {usePermissions} from './usePermissions';

export const useCheckPermissions = () => {
  const {setIsVisible, setMessageType} = useContext(PremiumModalContext);
  const {permissionCreateNewPlayer} = usePermissions();

  const handleCheckCreateNewPlayer = callback => {
    console.log(permissionCreateNewPlayer);
    if (permissionCreateNewPlayer) {
      callback();
    } else {
      setMessageType(LIMIT_PLAYERS);
      setIsVisible(true);
    }
  };

  return {
    handleCheckCreateNewPlayer,
  };
};
