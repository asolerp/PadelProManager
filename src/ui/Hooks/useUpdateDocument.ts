import {useState} from 'react';

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
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
      callback && callback();
    }
  };

  return {
    updateDocument,
    loading,
    error,
  };
};
