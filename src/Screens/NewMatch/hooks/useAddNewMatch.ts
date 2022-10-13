import {useContext, useState} from 'react';
import {matchQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';
import {useUserCounts} from '../../../Hooks/useUserCounts';

interface HookProps {
  docId?: string;
  data: any;
  callback?: () => void;
}

export const useAddNewMatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const {matchesCount} = useUserCounts();
  const {isCoach} = useContext(AuthContext);

  const addNewMatch = async ({data, callback}: HookProps) => {
    setLoading(true);
    try {
      setLoading(false);
      const result = await matchQuery
        .add({...data, free: isCoach ? matchesCount < 2 : true})
        .then(async docRef => {
          await matchQuery.doc(docRef.id).collection('history').add({
            date: new Date(),
            alert: '🎾 ¡Empieza el partido! 🎾',
            type: 'info',
          });
        });
      return result;
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    } finally {
      callback && callback();
    }
  };

  return {addNewMatch, loading, error};
};
