import {useContext} from 'react';
import {userQuery} from '../../../Api/queries';
import {AuthContext} from '../../../Context/AuthContex';
import {useUpdateDocument} from '../../../Hooks/useUpdateDocument';

export const useSetUserRole = () => {
  const {user} = useContext(AuthContext);
  const {updateDocument} = useUpdateDocument(userQuery);

  const handleUpdateRole = async role => {
    try {
      await updateDocument(user?.id, {role});
    } catch (err) {
      console.log(err);
    }
  };
  return {
    handleUpdateRole,
  };
};
