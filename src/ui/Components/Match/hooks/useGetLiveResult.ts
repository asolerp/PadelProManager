import {useDocumentData} from 'react-firebase-hooks/firestore';
import {matchQuery} from '../../../Api/queries';

export const useGetLiveResult = matchId => {
  const query = matchQuery.doc(matchId);

  const [match] = useDocumentData(query, {
    idField: 'id',
  });

  return {
    game: match?.game,
  };
};
