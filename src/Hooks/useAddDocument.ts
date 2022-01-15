import {useState} from 'react';

interface HookProps {
  docId?: string;
  data: any;
}

export const useAddDocument = query => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const addDocument = async ({docId, data}: HookProps) => {
    setLoading(true);
    try {
      setLoading(false);
      const result = docId
        ? await query.doc(docId).set({...data})
        : await query.add({...data});
      return result;
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  return {addDocument, loading, error};
};
