import {defaultFunctions} from '../Lib/API/firebaseApp';

export const useRecursiveDelete = ({path}) => {
  const recursiveDelete = async (callback?: () => void) => {
    const deleteFn = defaultFunctions.httpsCallable('recursiveDelete');
    try {
      await deleteFn({
        path: path,
      });
    } catch (err) {
      console.log(err);
    } finally {
      callback && callback();
    }
  };
  return {
    recursiveDelete,
  };
};
