import {useContext} from 'react';
import {AuthContext} from '../../../Context/AuthContex';

import {relationsQuery} from '../../../Api/queries';
import {useCollectionData} from 'react-firebase-hooks/firestore';
export const useCheckPendingRelation = () => {
  const {user} = useContext(AuthContext);
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
