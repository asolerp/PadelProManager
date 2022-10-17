import {useDocumentData} from 'react-firebase-hooks/firestore';
import {userQuery} from '../../../Api/queries';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';

export const useGetCoachInfo = () => {
  const {user} = useFirebaseAuth();

  const [coach] = useDocumentData(userQuery.doc(user?.coachId), {
    idField: 'id',
  });

  return {
    coach,
  };
};
