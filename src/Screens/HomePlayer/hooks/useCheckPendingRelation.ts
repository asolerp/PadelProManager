import {relationsQuery} from '../../../Api/queries';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {useFirebaseAuth} from '../../../Context/FirebaseContext';
export const useCheckPendingRelation = () => {
  const {user} = useFirebaseAuth();

  const query = relationsQuery
    .where('playerEmail', '==', user?.email)
    .where('status', '==', 'pending');

  const [pendingRelation] = useCollectionData(query, {
    idField: 'id',
  });

  return {
    pendingRelation,
  };
};
