import {useState} from 'react';

interface HookProps {
  docId?: string;
  data: any;
}

export const useUpdateDocument = query => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const updateDocument = async (
    docId: string,
    update: any,
    callback?: () => void,
  ) => {
    setLoading(true);
    try {
      await query.doc(docId).update(update);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    } finally {
      callback && callback();
    }
  };

  return {
    updateDocument,
    loading,
    error,
  };
};
