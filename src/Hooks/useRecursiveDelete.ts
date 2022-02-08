import {useState} from 'react';
import functions from '@react-native-firebase/functions';

const useRecursiveDelete = ({path, callback}) => {
  const [loading, setLoading] = useState(false);
  const recursiveDelete = async () => {
    const deleteFn = functions().httpsCallable('recursiveDelete');
    try {
      setLoading(true);
      await deleteFn({
        path: path,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      console.log('Borrado');
      callback && callback();
    }
  };
  return {
    loading,
    recursiveDelete,
  };
};

export default useRecursiveDelete;
