import {useContext} from 'react';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';

export const useGetLiveResult = matchId => {
  const {user} = useContext(AuthContext);
  const query = matchQuery.doc(matchId);

  const [match] = useDocumentData(query, {
    idField: 'id',
  });

  return {
    game: match?.game,
  };
};
