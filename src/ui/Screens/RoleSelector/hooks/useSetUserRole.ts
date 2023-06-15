import {useContext} from 'react';
import {userQuery} from '../../../Api/queries';

import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';

import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';
import {timeout} from '../../../Utils/timeout';
import {emptyStats} from '../../NewPlayer/utils/emptyStats';

export const useSetUserRole = () => {
  const {user} = useFirebaseAuth();

  const {updateDocument} = useUpdateDocument(userQuery);
  const {setText, setIsVisible} = useContext(LoadingModalContext);

  const handleUpdateRole = async role => {
    try {
      setText('Creaando nuevo jugador');
      setIsVisible(true);
      await timeout(2000);
      await updateDocument(user?.id, {role}).then(async () => {
        await userQuery
          .doc(user?.id)
          .collection('stats')
          .doc('global')
          .set(emptyStats);
      });
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
