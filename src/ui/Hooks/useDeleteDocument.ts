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
      await query.doc(docId).delete();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      callback && callback();
    }
  };

  return {deleteDocument, loading, error};
};
