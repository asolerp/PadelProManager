import {useState} from 'react';

interface HookProps {
  docId?: string;
  data: any;
  callback?: () => void;
}

export const useAddDocument = query => {
  const [loading, setLoading] = useState(false);
  const [docRefId, setDoRefId] = useState();
  const [error, setError] = useState();

  const addDocument = async ({docId, data, callback}: HookProps) => {
    setLoading(true);
    try {
      setLoading(false);
      const result = docId
        ? await query.doc(docId).set({...data})
        : await query.add({...data}).then(docRef => setDoRefId(docRef.id));
      return result;
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    } finally {
      callback && callback();
    }
  };

  return {addDocument, docRefId, loading, error};
};
