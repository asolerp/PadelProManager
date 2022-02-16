import functions from '@react-native-firebase/functions';

export const useRecursiveDelete = ({path}) => {
  const recursiveDelete = async (callback?: () => void) => {
    const deleteFn = functions().httpsCallable('recursiveDelete');
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
