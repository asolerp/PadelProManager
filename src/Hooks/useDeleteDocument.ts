import {useState} from 'react';

interface HookProps {
  docId?: string;
  callback?: () => void;
}

export const useDeleteDocument = query => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const deleteDocument = async ({docId, callback}: HookProps) => {
    setLoading(true);
    try {
      setLoading(false);
      await query.doc(docId).delete();
    } catch (err) {
      setError(err);
      setLoading(false);
    } finally {
      callback && callback();
    }
  };

  return {deleteDocument, loading, error};
};
