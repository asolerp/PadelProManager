import {useState} from 'react';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';

export const useAnswerRequest = () => {
  const [loading, setLoading] = useState();
  const {user} = useFirebaseAuth();
  const responseInvitationFn =
    defaultFunctions.httpsCallable('responseInvitation');

  const handleUpdateRequest = async (requestId, state, callback) => {
    setLoading(true);
    try {
      await responseInvitationFn({
        requestId,
        playerEmail: user.email,
        response: state,
      });
      callback();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleUpdateRequest,
  };
};
