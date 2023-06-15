import {useState} from 'react';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';
import {info} from '../../../Lib/Logging';
import {popScreen} from '../../../Router/utils/actions';

export const useSyncCoach = () => {
  const {user} = useFirebaseAuth();
  const onSyncCoachFn = defaultFunctions.httpsCallable('onSyncPlayer');
  const [loading, setLoading] = useState();
  const handleSyncCoach = async syncCode => {
    setLoading(true);
    try {
      await onSyncCoachFn({
        syncCode,
        playerId: user?.id,
      });
      info({
        title: 'Sincronización con éxito',
        subtitle: 'Todo ha ido correctamente',
      });
      popScreen();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return {loading, handleSyncCoach};
};
