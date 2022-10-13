import {useContext} from 'react';

import {AuthContext} from '../../../Context/AuthContex';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {userQuery} from '../../../Api/queries';

export const useGetCoachInfo = () => {
  const {user} = useContext(AuthContext);
  const [coach] = useDocumentData(userQuery.doc(user?.coachId), {
    idField: 'id',
  });

  return {
    coach,
  };
};
