import {useContext} from 'react';
import {userQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {timeout} from '../../../Utils/timeout';

export const useSetUserRole = () => {
  const {user} = useContext(AuthContext);
  const {updateDocument} = useUpdateDocument(userQuery);
  const {setText, setIsVisible} = useContext(LoadingModalContext);

  const handleUpdateRole = async role => {
    try {
      setText('Creaando nuevo jugador');
      setIsVisible(true);
      await timeout(2000);
      await updateDocument(user?.id, {role});
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisible(false);
    }
  };
  return {
    handleUpdateRole,
  };
};
