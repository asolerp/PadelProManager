import {useContext, useState} from 'react';
import {userQuery} from '../../../Api/queries';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {LoadingModalContext} from '../../../Context/LoadingModalContext';
import {useLogout} from '../../../Hooks/useLogout';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';
import {timeout} from '../../../Utils/timeout';

export const useConfigProfile = () => {
  const {user, setUser} = useFirebaseAuth();
  const [isVisible, setIsVisible] = useState();
  const {setIsVisible: setIsVisibleLoading, setText} =
    useContext(LoadingModalContext);

  const leaveCoachFn = defaultFunctions.httpsCallable('leaveCoach');

  const handleLeaveCoach = async () => {
    try {
      setText('Dejando entrenador...');
      setIsVisible(false);
      await timeout(1000);
      setIsVisibleLoading(true);
      await timeout(2000);
      await leaveCoachFn({
        playerEmail: user?.email,
        playerId: user?.id,
        coachId: user?.coachId,
      });
      const userUpdatedQuery = await userQuery.doc(user?.id).get();
      const userDoc = {id: userUpdatedQuery.id, ...userUpdatedQuery.data()};
      setUser({loggedIn: true, ...userDoc});
    } catch (err) {
      console.log(err);
    } finally {
      setIsVisibleLoading(false);
    }
  };

  return {
    handleLeaveCoach,
  };
};
