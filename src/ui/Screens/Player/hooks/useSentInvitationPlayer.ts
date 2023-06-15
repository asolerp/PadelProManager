import {useFirebaseAuth} from '../../../Context/FirebaseContext';
import {defaultFunctions} from '../../../Lib/API/firebaseApp';
import {info} from '../../../Lib/Logging';

export const useSentInvitationPlayer = () => {
  const sentInvitationFn = defaultFunctions.httpsCallable('sentInvitation');
  const {user} = useFirebaseAuth();
  const handleSentInviation = async player => {
    try {
      await sentInvitationFn({
        coachId: user?.id,
        player,
      });
      info({
        title: 'Invitación enviada',
        subtitle: 'La invitación se ha enviado correctamente',
      });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    handleSentInviation,
  };
};
